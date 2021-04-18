//Stores all cross script functions and cross script firebase variables

//Change element values
function setValue(elem, string) {
    $(elem).val('');
    $(elem).attr("placeholder", string)
    $(elem).css('border-color', 'red')
}

//Reset element on input
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

//firebase variables & functions

//Set name and image
setTimeout(async() => {

  await firebase.database().ref('Users/' + firebase.auth().currentUser.uid).on('value', async function(snapshot) {
    sessionStorage.setItem("username",snapshot.val().name)
  })

  await firebase.storage().ref('/Users/' + firebase.auth().currentUser.uid + '/profile').getDownloadURL().then(imgUrl=>{
    /* ---Using sessionStorage probably a bad thing should just input into variable---*/
    sessionStorage.setItem("URL",imgUrl)
  })
}, 2000)
async function sendToServer(obj, path = sessionStorage.getItem('chat')){
  /* ---Sets a random key so that data does not get overwritten--- */
  autoId = firebase.database().ref('users').push().key
  /* ---Actully updates the server---  */
  await firebase.database().ref(`${path}/` + autoId.toString()).set(obj)
}

//Send functions
