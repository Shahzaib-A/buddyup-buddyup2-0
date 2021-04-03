function cleanMessage(message){
message = message.split(" ").map(x => badWords.indexOf(x) != -1? x = (x.split("").map(c => c = '*')).join(""): x = x).join(" ")
return message
}

function sendToServer(obj){
  autoId = firebase.database().ref('users').push().key
  firebase.database().ref('/general/' + autoId.toString()).set(obj)
}

function sendToPrivate(obj){
  autoId = firebase.database().ref('users').push().key
  firebase.database().ref('/Private/' + autoId.toString()).set(obj)
}
async function getImage(){
    await firebase.storage().ref('/Users/' + firebase.auth().currentUser.uid + '/profile').getDownloadURL().then(imgUrl=>{
      sessionStorage.setItem("URL",imgUrl)
    })
    const img = sessionStorage.getItem("URL");
    sessionStorage.removeItem("URL")
    return img
  }
function isPrivate(message){
  if(message.split(" ")[0].split("")[0] == "@"){
    return [true,message.split(" ")[0].replace("@","")]
  }
  return false
}

$(".enter-message").on('keyup', async function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
      let profileImage = await getImage()
      firebase.database().ref('Users/' + firebase.auth().currentUser.uid).on('value', async function(snapshot) {
      let username = snapshot.val().name
      let message = cleanMessage($(".enter-message").val())
      if(message != ""){
      let html = `
      <li>
      <img src=${profileImage} alt="">
        <div>
          <h2 class="name">${username}</h2>
            <h2 class="message">
              ${message}
            </h2>
        </div>
      </li>
      `
      let messageObject = {
        messageToDisp:html
      }

      if(isPrivate(message)[0]){
        messageObject.sendTo = isPrivate(message)[1]
        messageObject.sender = username
        await sendToPrivate(messageObject)
      }else{
        await sendToServer(messageObject)
      }
      $(".enter-message").val('')
      }
      });
    }
});
