
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
			if(!isLeapYear(currentYear)){
				changeDays(daysOfMonth[months[(monthInArray + 1)%12]][0])
			}
			else if(isLeapYear(currentYear) && months[(monthInArray + 1)%12] == "February"){
				changeDays(daysOfMonth[months[(monthInArray + 1)%12]][1])
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
				if(!isLeapYear(currentYear)){
					changeDays(daysOfMonth[months[(monthInArray - 1)%12]][0])
				}
				else if(isLeapYear(currentYear) && months[(monthInArray - 1)%12] == "February"){
					changeDays(daysOfMonth[months[(monthInArray - 1)%12]][1])
				}
			}
      break;
  }
})

		$(".todo-list-container").hide()
// ---To do pop up--- //
$(".days li").click(()=>{
		$(".todo-list-container").toggle("slow")
		let date = $(".info-date").text().split(":")[1].split(" ")
		// let dateClicked =
		console.log($(this).html())
})

$(".cancel").click(()=>{
	$(".todo-list-container").toggle("slow")
})
//Rahul
