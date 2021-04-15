if(window.location.pathname == "/index.html"){
		$('.calendar').css('display','none')
		$('.meet').css('display','none')
		$('.about').css('display','none')
		$('.settngs').text('Log in')
		$('.settngs').attr('href','HtmlFiles/login.html')
}else{
	$('.about').css('display','none')
}
