  function getMonthFromString(month) {
    var d = Date.parse(month + "1, 2012");
    if (!isNaN(d)) {
      return new Date(d).getMonth() + 1;
    }
    return -1;
  }

  function diffrence(d1) {
    // https://www.delftstack.com/howto/javascript/javascript-subtract-dates/
    const cDate = Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate())
    const evDate = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate())
    const day = 1000 * 60 * 60 * 24;
    return (evDate - cDate) / day
  }


  async function eventNotification(eventObject) {
    for(let i = 0; i<eventObject.length;i++){
        let evnt = eventObject[i].slice(-1)[0]
        let date_raw = eventObject[i][0]
        const date = new Date(`${eventObject[i][1]}-${getMonthFromString(date_raw.split(" ")[1])}-${date_raw.split(" ").slice(-1)[0].replace(/\D/g, '')}`)
        var time_between_dates = diffrence(date)
        var notes = [...document.querySelectorAll('.notification')].map(x => x = x.querySelector('.id').innerText)
        var note_date = [...document.querySelectorAll('.notification')].map(x => x = x.querySelector('.description').innerText.split(" ").splice(-3).join(" "))
        if (time_between_dates >= 0 && time_between_dates <= 5){
          if(notes.indexOf(evnt) == -1 && notes.indexOf(date_raw) == -1){
              addNotification(`Event: ${evnt} is on ${date_raw}`, 'Date Nearing!',evnt,false,'event')
              for(let i = 0; i<subject.length;i++){
                if(evnt.toLowerCase().includes(subject[i])){
                  findPeople(subject[i])
                }
              }
          }
        }
        else if(time_between_dates >= -5 && time_between_dates <= 0){
          if(notes.indexOf(evnt) == -1 && notes.indexOf(date_raw) == -1){
              addNotification(`Event: ${evnt} was on ${date_raw}`, 'Date passed!',evnt,false,'event')
          }
        }
    }
  //   try {
  //     if (updatednew) {
  //       const date = new Date(`${evnt[1]}-${getMonthFromString(evnt[0][1])}-${evnt[0][2].replace(/\D/g, '')}`)
  //       var time_between_dates = diffrence(date)
  //       if (time_between_dates >= 0 && time_between_dates <= 5){
  //         console.log(evnt[0].join(" "))
  //         addNotification(`Event: ${evnt[2]} on ${evnt[0].join(" ")}`, 'Date nearing!',evnt[0].join(" "),false,'event')
  //         // message, title,id,special,type
  //         if (subject.join(" ").includes((evnt[2].split('-')[0]).toLowerCase())){
  //           findPeople((evnt[2].split('-')[0]).toLowerCase())
  //         }
  //       }
  //       else if(time_between_dates >= -5 && time_between_dates <= 0){
  //         addNotification(`Event: ${evnt[2]} on ${evnt[0].join(" ")}`, 'Date passed!',evnt[0].join(" "),false,'event')
  //       }
  //     } else {
  //       var events = []
  //       eventObject.forEach(async (item, i) => {
  //         const date = new Date(`${item[1]}-${getMonthFromString(item[0][1])}-${item[0][2].replace(/\D/g, '')}`)
  //         var time_between_dates = diffrence(date)
  //
  //         if (time_between_dates <= 5 && time_between_dates >= -5) {
  //           item[2].forEach(async (evn, i) => {
  //             //Check if any subjects match
  //             if(time_between_dates >= -5){
  //               addNotification(`Event: ${evn} on ${item[0].join(" ")}`, 'Date nearing!', evn,false,'event')
  //               if (subject.join(" ").includes((evn.split('-')[0]).toLowerCase())) {
  //                 if (events.indexOf((evn.split('-')[0]).toLowerCase()) == -1) {
  //                   events.push((evn.split('-')[0]).toLowerCase())
  //                 }
  //               }
  //             }
  //             else if(time_between_dates <= 5){
  //               addNotification(`Event: ${evn} on ${item[0].join(" ")}`, 'Date passed!', evn,false,'event')
  //             }
  //
  //           });
  //
  //         }
  //       })
  //       for (let i = 0; i < events.length; i++) {
  //         findPeople(events[i])
  //       }
  //       updatednew = true
  //     }
  //   } catch {}
  //
  //   // Close button function
  //   // $('.cls').unbind().click(async function(event) {
  //   //   if(event.currentTarget.parentNode.querySelector('.type').innerText != 'chat'){
  //   //     console.log(event.currentTarget.parentNode.querySelector('.type'))
  //   //   var notification = event.currentTarget.parentNode
  //   //   let descrip = event.currentTarget.parentNode.firstElementChild.childNodes[3].innerText.replace('Event: ', '')
  //   //   let date = descrip.split(" ").slice(-3).join(" ")
  //   //   note = descrip.replace(`on ${date}`, '').trim()
  //   //   await firebase.database().ref("Users/" + firebase.auth().currentUser.uid + "/Events/" + date + "/" + note).remove()
  //   //   var notL = document.querySelectorAll('.noteList li')
  //   //   for (let i = 0; i < notL.length; i++) {
  //   //     if (notL[i].innerHTML.split("<a")[0] == note) {
  //   //       notL[i].remove()
  //   //       break
  //   //     }
  //   //   }
  //   //
  //   //   notification.classList.add('animate-out')
  //   //   setTimeout(()=>{
  //   //     notification.remove()
  //   //   },500)
  //   // }
  //   // })
  }
