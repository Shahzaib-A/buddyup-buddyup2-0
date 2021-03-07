const mediaQuery = window.matchMedia('(max-width: 1295px)')

if (mediaQuery.matches) {
	$("#nav-toggle").on('change', function(){
		if(this.checked){
			$('#side-nav').show()
			$('#side-toggle').prop('checked', false);
		}
	})

	$("#side-toggle").on('change', function(){
		if(this.checked){
			$('#side-nav').hide();
			$('#nav-toggle').prop('checked', false);
		}
	})
}
else{
$('#side-nav').css("transform","translateX(100%)");
$("#nav-toggle").on('change', function(){
 if(this.checked){
			$('#side-nav').removeClass("hid");
			$('#side-nav').addClass("shw")
			$('#side-toggle').prop('checked', false);
	 }
})

$("#side-toggle").on('change', function(){
 if(this.checked){
	 		$('#side-nav').removeClass("shw");
			$('#side-nav').addClass("hid")
			$('#nav-toggle').prop('checked', false);
	 }
})
}
