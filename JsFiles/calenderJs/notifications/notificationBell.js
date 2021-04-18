$(".notif_list").on('DOMNodeInserted', function(e) {
    if(Object.keys(document.querySelectorAll('.notification')).length > 0){
      $('.count').css('display','block')
      $('.count').text(`${Object.keys(document.querySelectorAll('.notification')).length}`)
    }
});

$(".notif_list").on('DOMNodeRemoved', function(e) {
  if(Object.keys(document.querySelectorAll('.notification')).length- 1 != 0){
    $('.count').text(`${Object.keys(document.querySelectorAll('.notification')).length- 1}`)
  }
  else{
    $('.count').css('display','None')
  }
});
