//Change element values
function setValue(elem, string) {
    $(elem).val('');
    $(elem).attr("placeholder", string)
    $(elem).css('border-color', 'red')
}

function resetValue(elem, string){
  $(elem).keypress(letter=>{
  $(elem).css('border-color', 'rgba(0,234,80,0.6) ')
  $(elem).attr("placeholder",string)
  })
}
// Taken from https://stackoverflow.com/questions/21991062/jquery-effect-is-not-a-function
function shake(element) {
  var div = document.querySelector(element);
  var interval = 100;
  var distance = 10;
  var times = 4;

  $(div).css('position', 'relative');

  for (var iter = 0; iter < (times + 1); iter++) {
    $(div).animate({
      left: ((iter % 2 == 0 ? distance : distance * -1))
    }, interval);
  }
  $(div).animate({
    left: 0
  }, interval);
}

//check if mobile
//Credits https://coderwall.com/p/i817wa/one-line-function-to-detect-mobile-devices-with-javascript
function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};
