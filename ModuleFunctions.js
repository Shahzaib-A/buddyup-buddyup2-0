//Change element values
function setValue(elem,string){
  $(elem).val('');
  $(elem).attr("placeholder",string)
  $(elem).css('border-color', 'red')
}

//Call shake function
function shake(elem){
$(document).ready(function(){
  $(elem).addClass("error");
  setTimeout(function(){
    $(elem).removeClass("error");
  },500)
});
}
