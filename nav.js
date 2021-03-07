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
