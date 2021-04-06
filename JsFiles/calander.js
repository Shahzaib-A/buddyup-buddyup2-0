//makes sure it displays the current date, selects it
//

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var daysOfMonth = {
	'January':[31],
	"February":[28,29],
	"March":[31],
	"April":[30],
	"May":[31],
	"June":[30],
	"July":[31],
	"August":[31],
	"September":[30],
	"October":[31],
	"November":[30],
	"December":[31]
}

//This is to change the date
function changeDays(maxDays){
	var counter = 1
	$('.days').find('li').text('')
	$('.days').find('li').show()
	$('.days').find('li').each(function () {
		if(counter <= maxDays){
		$(this).text(counter)
		counter+=1
		}else{
		 $(this).hide()
		}
		if(counter == maxDays){
			return
		}
	})
}

function isLeapYear(year){
	if((year/4)%1 == 0 && (year/100)%1 != 0){
		return true
	}
	else if((year/400)%1 == 0){
		return true
	}else{
		return false
	}
}

//This is to auto month
dateObj = new Date();
let currentDate = [months[dateObj.getMonth()],dateObj.getFullYear()]
$(".current_month").text(currentDate[0])
$(".year").text(currentDate[1])

if(isLeapYear(currentDate[1]) && currentDate[0] == "February"){
	changeDays(daysOfMonth[currentDate[0]][1])
}
else{
	changeDays(daysOfMonth[currentDate[0]][0])
}

// Onclick of any of the arrows change the month
$(".arrow").click(function(){
	// Variables
	let monthInArray = months.indexOf($(".current_month").text())
  var currentYear = parseInt($(".year").text())
	// Check the id of the arrow clicked
	switch(this.id){

    case "right":
			// Go to next month
			$(".current_month").text(months[(monthInArray + 1)%months.length])
			if(isLeapYear(currentYear) && months[(monthInArray + 1)%12] == "February"){
				changeDays(daysOfMonth[months[(monthInArray + 1)%12]][1])
			}
			else{
				changeDays(daysOfMonth[months[(monthInArray + 1)%12]][0])
			}
			// Go to next year
			if(monthInArray + 1 > 11){
				if(isLeapYear(currentYear+1)){
					$(".year").text(currentYear+1)
				}else{
					$(".year").text(currentYear+1)
				}
			}
      break;

		case "left":
		// Check if month is january
			if((monthInArray - 1)%months.length < 0){
				$(".current_month").text(months[11])
				if(isLeapYear(currentYear-1)){
					$(".year").text(currentYear-1)
				}else{
					$(".year").text(currentYear-1)
				}
			}	else{
				$(".current_month").text(months[(monthInArray - 1)%months.length])
				if(isLeapYear(currentYear) && months[(monthInArray - 1)%12] == "February"){
					changeDays(daysOfMonth[months[(monthInArray - 1)%12]][1])
				}
				else{
					changeDays(daysOfMonth[months[(monthInArray - 1)%12]][0])
				}
			}
      break;
  }
})




// $(".todo-list-container").hide()

// ---To do pop up--- //

//Something cool that I learned, Arrow functions are aynonmus so... this will always reffer to the window. So in this case I have to use a function as a callback
changeNow = false
$(".days li").click(function x(){
		changeNow = true
		$(".todo-list-container").toggle("slow")
		let dateSelected = [$(".current_month").text(),this.innerHTML,$(".year").text()]
		if(changeNow){
			document.querySelector(".info-date").innerHTML = $(".info-date").text().split(" ").map((v,i) => v == ""? v = v: i == 1?v.replace(v,`${dateSelected[i]},`):v.replace(v,dateSelected[i])).join(" ")
			changeNow = false
		}
})


$(".cancel").click(()=>{
	$(".todo-list-container").toggle("slow")
})
//Rahul
