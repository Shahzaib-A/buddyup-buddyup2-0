/*
  Commented by Rahul
*/

/* ---Sets current tab user is in--- */
sessionStorage.setItem('cTab', "Calendar")
/* ---calander--- */

//Sets box around current date
function setActive(){
  if ($('.current_month').text() == currentDate[0] && $('.year').text() == currentDate[1]) {
    let div = document.createElement('span')
    div.setAttribute('class', 'active')
    div.innerText = document.querySelectorAll('.days li')[currentDate[2] - 1].innerText
    document.querySelectorAll('.days li')[currentDate[2] - 1].innerText = ''
    document.querySelectorAll('.days li')[currentDate[2] - 1].appendChild(div)
  }
}

//Generates random pictures based on month
function randomPic(month){
  for (let i = 0; i < images.length; i += 2) {
    if (images[i].includes(month.toLowerCase())) {
      randomIndex = Math.floor(Math.random()*3)
      document.querySelector('.calendar-cont .leftCol').style.backgroundImage = `url(${images[i + 1][randomIndex]})`
      document.querySelector('.calendar-cont .leftCol').style.backgroundSize = "cover"
      console.log(images[i + 1].slice(-1)[0][randomIndex])
      break
    }
  }
}

//This is to change the date based on the month
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

//Determines if the year is a leap year based on a series of tests
function isLeapYear(year) {
  if ((year / 4) % 1 == 0 && (year / 100) % 1 != 0) {
    return true
  } else if ((year / 400) % 1 == 0) {
    return true
  } else {
    return false
  }
}

//Makes the day into a cardinal event -> 5 -> 5th
function makeCardinal(dateNum) {
  let additions = {
    '1': 'st',
    '2': 'nd',
    '3': 'rd'
  }
  if (dateNum != "11" && dateNum != "12" && dateNum != "13") {
    //Last digit of number exists then it adds the corrosponding value
    additions[dateNum.slice(-1)] ? dateNum += additions[dateNum.slice(-1)] : dateNum += 'th'
  } else {
    dateNum += 'th'
  }

  return dateNum
}


//This is to auto month, sets month text and year text to current date
$(".current_month").text(currentDate[0])
$(".year").text(currentDate[1])
if (isLeapYear(currentDate[1]) && currentDate[0] == "February") {
  changeDays(daysOfMonth[currentDate[0]][1])
} else {
  changeDays(daysOfMonth[currentDate[0]][0])
}

//Sets a box around current day and set bg picture
setActive()
randomPic($('.current_month').text())

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
      // Check if month is january, if so set to december
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

/* --- Formats the date --- */
document.querySelector('.date').innerHTML = `${days[dateObj.getDay()]} ${currentDate[0]} ${makeCardinal(currentDate[2].toString())}`
