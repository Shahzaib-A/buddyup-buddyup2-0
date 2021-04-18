function makeNote(note) {
  let noteHtml = [document.createElement('li'), document.createElement('a')]
  noteHtml[1].setAttribute('title', "Remove note")
  noteHtml[1].setAttribute('href', "#")
  noteHtml[1].setAttribute('class', "removeNote animate")
  noteHtml[1].innerHTML = "x"
  noteHtml[0].innerHTML = note
  noteHtml[0].appendChild(noteHtml[1])
  document.querySelector('.noteList').appendChild(noteHtml[0])
}

function setEvent(dateArray) {
  for (let i = 0; i < dateArray.length; i++){
    let day = dateArray[i][0].replace(/\D/g, '')
    if (dateArray[i][0].split(" ")[1] == $('.current_month').text() && day != currentDate[2] && dateArray[i][1] == $('.year').text()){
      let span = document.createElement('span')
      span.setAttribute('class', 'event')
      span.innerText = document.querySelectorAll('.days li')[day - 1].innerText
      document.querySelectorAll('.days li')[day - 1].innerText = ''
      document.querySelectorAll('.days li')[day - 1].appendChild(span)
    }
  }
}

function removeFromAllEvents(note,date){
  var days = document.querySelectorAll('.days li')
  let newEvents = []
    for(let row = 0; row<allEvents.length;row++){
      if(allEvents[row][0].includes(date) && allEvents[row][2].includes(note)){
        allEvents.splice(row,1)
        break
      }
    }

if(allEvents.flat(Infinity).join(" ").includes(date) == false && days[date.replace(/\D/g, '')-1].childNodes[0].className != 'active'){
    days[date.replace(/\D/g, '')-1].childNodes[0].remove()
    days[date.replace(/\D/g, '')-1].innerText = date.replace(/\D/g, '')
  }
}

setTimeout(async () => {
  /* Update events */
  async function updateData(dateWanted) {
    let date = dateWanted.split(" ").slice(-1)[0].replace('th', '').replace('nd', '').replace('rd', '').replace('st', '') * 1
    dateWanted = `${(dateWanted.split(" ").slice(0,2)).join(" ")} ${makeCardinal(date.toString())}`

    await firebase.database().ref("Users/" + firebase.auth().currentUser.uid + "/Events/").orderByChild(dateWanted).once('value', snapshot => {
      let events_for_date = snapshot.val()
      try {

        Object.keys(events_for_date).forEach((item, i) => {
          let date_push = item
          let year = events_for_date[item][Object.keys(events_for_date[item])[0]].year
          let activites = Object.keys(events_for_date[item])
          for(let a = 0; a<activites.length;a++){
            flatendObject = allEvents.flat(Infinity)
            if(flatendObject.join(" ").includes(`${date_push} ${year} ${activites[a]}`) == false){
                allEvents.push([date_push, year, activites[a]])
            }
          }
        });


        Object.keys(events_for_date[dateWanted]).forEach((item, i) => {
          makeNote(item)
        });

      } catch (err) {
        document.querySelector('.noteList').innerHTML = ''
      }
    })
  }

  await updateData($('.date').text())
  setEvent(allEvents)
  eventNotification(allEvents)

  $(".days li").click(async function() {
    document.querySelector('.noteList').innerHTML = ''
    let cd = makeCardinal(this.innerText)
    let weekDay = new Date(`${$(".current_month").text()} ${$(this).text()} ${$('.year').text()}`)
    var options = {
      weekday: 'long'
    };

    document.querySelector('.date').innerHTML = `${new Intl.DateTimeFormat('en-US', options).format(weekDay)} ${$(".current_month").text()} ${cd}`
    await updateData($('.date').text())
  })

  $(".arrow").click(function() {
    setEvent(allEvents)
    randomPic($('.current_month').text())
  })

  $(".addNote").click(async function() {
    let noteToAdd = [$(".note").val(), $('.date').text(), $('.year').text()]
    if (noteToAdd[0] != '') {
      let noteHtml = [document.createElement('li'), document.createElement('a')]
      makeNote(noteToAdd[0])
      document.querySelector('.noteList').appendChild(noteHtml[0])
      await firebase.database().ref("Users/" + firebase.auth().currentUser.uid + "/Events/" + `${noteToAdd[1]}`).child(noteToAdd[0]).set({
        Date: noteToAdd[1],
        EventHtml: noteToAdd[0],
        year: noteToAdd[2],
        read: false
      })
      allEvents.push([$('.date').text(), $('.year').text(), noteToAdd[0]])
      setEvent(allEvents)
      $(".note").val('')
    }
    eventNotification(allEvents)
  })

  $(document).on('click', ".removeNote", async function() {
    //Removing from notification list
    let note = [this.parentNode.innerHTML.split('<')[0], $('.date').text()]
    await firebase.database().ref(`Users/${firebase.auth().currentUser.uid}/Events/${note[1]}/${note[0]}`).remove()
    this.parentNode.remove()
    removeFromAllEvents(note[0],note[1])
    var notifList = document.querySelectorAll('.description')
    for (let i = 0; i < notifList.length; i++) {
      if (notifList[i].innerText.replace("Event: ", "").includes(note[0])) {
        notifList[i].parentNode.parentNode.classList.add('animate-out')
        setTimeout(() => {
          notifList[i].parentNode.parentNode.remove()
        }, 500)
        break;
      }
    }
  })
}, 2000)
