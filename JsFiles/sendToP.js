function cleanMessage(message){
message = message.split(" ").map(x => badWords.indexOf(x) != -1? x = (x.split("").map(c => c = '*')).join(""): x = x).join(" ")
return message
}

function sendToServer(obj){
  autoId = firebase.database().ref('users').push().key
  firebase.database().ref('/general/' + autoId.toString()).set(obj)
}
async function getImage(){
    await firebase.storage().ref('/Users/' + firebase.auth().currentUser.uid + '/profile.png').getDownloadURL().then(imgUrl=>{
      sessionStorage.setItem("URL",imgUrl)
    }).catch(err=>{
      alert(err)
    })
    const img = sessionStorage.getItem("URL");
    sessionStorage.removeItem("URL")
    return img
  }

$(".send").click(async function(){
  let profileImage = await getImage()
  firebase.database().ref('Users/' + firebase.auth().currentUser.uid).on('value', function(snapshot) {
  let username = snapshot.val().name
  let message = cleanMessage($(".enter-message").val())
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
  sendToServer(messageObject)
  $(".enter-message").val('')
  });
})
