/*
	---Tasks---
	PRESSING FIX METHOD OF GETTING MONTHS AND DAYS!!

	1. calander switching dates on arrow done
	2.change date on to do done
	3.automaticly set to-do to todays date done
	4.load data to selected to-do

	---Logic---

*/

/* ---calander--- */
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturaday"]
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var daysOfMonth = {
  'January': [31],
  "February": [28, 29],
  "March": [31],
  "April": [30],
  "May": [31],
  "June": [30],
  "July": [31],
  "August": [31],
  "September": [30],
  "October": [31],
  "November": [30],
  "December": [31]
}
dateObj = new Date();
let currentDate = [months[dateObj.getMonth()], dateObj.getFullYear(), dateObj.getDate()]
let allEvents = []

function setActive() {

  if ($('.current_month').text() == currentDate[0] && $('.year').text() == currentDate[1]) {
    let div = document.createElement('span')
    div.setAttribute('class', 'active')
    div.innerText = document.querySelectorAll('.days li')[currentDate[2] - 1].innerText
    document.querySelectorAll('.days li')[currentDate[2] - 1].innerText = ''
    document.querySelectorAll('.days li')[currentDate[2] - 1].appendChild(div)
  }
}

function setEvent(dateArray) {
  for (let i = 0; i < dateArray.length; i++) {
    let day = dateArray[i][0][2].replace(/\D/g, '');
    if (dateArray[i][0][1] == $('.current_month').text() && day != currentDate[2] && dateArray[i][1] == $('.year').text()){
      let span = document.createElement('span')
      span.setAttribute('class', 'event')
      span.innerText = document.querySelectorAll('.days li')[day - 1].innerText
      document.querySelectorAll('.days li')[day - 1].innerText = ''
      document.querySelectorAll('.days li')[day - 1].appendChild(span)
    }
  }
}
//This is to change the date
function changeDays(maxDays) {
  var counter = 1
  $('.days').find('li').text('')
  $('.days').find('li').show()
  $('.days').find('li').each(function() {
    if (counter <= maxDays) {
      $(this).text(counter)
      counter += 1
    } else {
      $(this).hide()
    }
    if (counter == maxDays) {
      return
    }
  })
  setActive()
}

function isLeapYear(year) {
  if ((year / 4) % 1 == 0 && (year / 100) % 1 != 0) {
    return true
  } else if ((year / 400) % 1 == 0) {
    return true
  } else {
    return false
  }
}

//This is to auto month
$(".current_month").text(currentDate[0])
$(".year").text(currentDate[1])
if (isLeapYear(currentDate[1]) && currentDate[0] == "February") {
  changeDays(daysOfMonth[currentDate[0]][1])
} else {
  changeDays(daysOfMonth[currentDate[0]][0])
}
setActive()
// Onclick of any of the arrows change the month
$(".arrow").click(function() {
  // Variables
  let monthInArray = months.indexOf($(".current_month").text())
  var currentYear = parseInt($(".year").text())
  // Check the id of the arrow clicked
  switch (this.id) {
    case "right":
      // Go to next month
      $(".current_month").text(months[(monthInArray + 1) % months.length])
      if (isLeapYear(currentYear) && months[(monthInArray + 1) % 12] == "February") {
        changeDays(daysOfMonth[months[(monthInArray + 1) % 12]][1])
      } else {
        changeDays(daysOfMonth[months[(monthInArray + 1) % 12]][0])
      }
      // Go to next year
      if (monthInArray + 1 > 11) {
        if (isLeapYear(currentYear + 1)) {
          $(".year").text(currentYear + 1)
        } else {
          $(".year").text(currentYear + 1)
        }
      }
      break;
    case "left":
      // Check if month is january
      if ((monthInArray - 1) % months.length < 0) {
        $(".current_month").text(months[11])
        if (isLeapYear(currentYear - 1)) {
          $(".year").text(currentYear - 1)
        } else {
          $(".year").text(currentYear - 1)
        }
      } else {
        $(".current_month").text(months[(monthInArray - 1) % months.length])
        if (isLeapYear(currentYear) && months[(monthInArray - 1) % 12] == "February") {
          changeDays(daysOfMonth[months[(monthInArray - 1) % 12]][1])
        } else {
          changeDays(daysOfMonth[months[(monthInArray - 1) % 12]][0])
        }
      }
      break;
  }
})
/* ---calendar ends  */

/* --- Change to do --- */

function makeCardinal(dateNum) {
  let additions = {
    '1': 'st',
    '2': 'nd',
    '3': 'rd'
  }
  if (dateNum != "11" && dateNum != "12" && dateNum != "13") {
    additions[dateNum.slice(-1)] ? dateNum += additions[dateNum.slice(-1)] : dateNum += 'th'
  } else {
    dateNum += 'th'
  }

  return dateNum
}

document.querySelector('.date').innerHTML = `${days[dateObj.getDay()]} ${currentDate[0]} ${makeCardinal(currentDate[2].toString())}`

/* ---change to do ends--- */


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

setTimeout(async () => {
  /* Update events */
  async function updateData(dateWanted) {
    let date = dateWanted.split(" ").slice(-1)[0].replace('th', '').replace('nd', '').replace('rd', '') * 1
    dateWanted = `${(dateWanted.split(" ").slice(0,2)).join(" ")} ${makeCardinal(date.toString())}`
    await firebase.database().ref("Users/" + firebase.auth().currentUser.uid + "/Events/").orderByChild(dateWanted).once('value', snapshot => {
      let events_for_date = snapshot.val()
      try {
        Object.keys(events_for_date).forEach((item, i) => {
          let date = item.split(" ")
          let year = events_for_date[item][Object.keys(events_for_date[item])[0]].year
          let activites = Object.keys(events_for_date[item])
          allEvents.push([date, year,activites])
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
  })

  $(".addNote").click(async function() {
    let noteToAdd = [$(".note").val(), $('.date').text(), $('.year').text()]
    if (noteToAdd[0] != ''){
      let noteHtml = [document.createElement('li'), document.createElement('a')]
      makeNote(noteToAdd[0])
      document.querySelector('.noteList').appendChild(noteHtml[0])
      await firebase.database().ref("Users/" + firebase.auth().currentUser.uid + "/Events/" + noteToAdd[1]).child(noteToAdd[0]).set({
        Date: noteToAdd[1],
        EventHtml: noteToAdd[0],
        year: noteToAdd[2]
      })
      allEvents.push([$('.date').text().split(" "), $('.year').text()])
      setEvent(allEvents)
      $(".note").val('')
    }
  })

  $(document).on('click', ".removeNote", async function() {
    let note = [this.parentNode.innerHTML.split('<')[0], $('.date').text()]
    await firebase.database().ref(`Users/${firebase.auth().currentUser.uid}/Events/${note[1]}/${note[0]}`).remove()
    this.parentNode.remove()
    document.querySelectorAll('li .event').forEach((item, i) => {
      if(document.querySelector('.noteList').innerText == 0){
        document.querySelectorAll('.days li')[note[1].split(" ").slice(-1)[0].replace(/\D/g, '')*1-1].childNodes[0].remove()
        document.querySelectorAll('.days li')[note[1].split(" ").slice(-1)[0].replace(/\D/g, '')*1-1].innerText = note[1].split(" ").slice(-1)[0].replace(/\D/g, '')
      }
    });

  })
}, 2000)
