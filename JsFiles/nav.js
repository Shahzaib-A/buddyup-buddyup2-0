let open = false
$("#navs").click(() =>{
	if(open){
			$("nav ul").css("width", "0%");
			open = false;
	}
	else{
		$("nav ul").css("width", "35%");
		open = true;
	}
})
