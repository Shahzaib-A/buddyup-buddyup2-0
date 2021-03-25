function cleanMessage(message){
message = message.split(" ").map(x => badWords.indexOf(x) != -1? x = (x.split("").map(c => c = '*')).join(""): x = x).join(" ")
return message
}

function sendToServer(obj) {
autoId = firebase.database().ref('users').push().key
firebase.database().ref('/general/' + autoId.toString()).set(obj)
}

console.log(sendToServer) //returns function
$(".send").click(function() {
firebase.database().ref('Users/' + firebase.auth().currentUser.uid).on('value', function(snapshot) {
digits = snapshot.val().digits
let message = cleanMessage($(".enter-message").val())

let messageObject = {
message: message,
sender: digits
}
sendToServer(messageObject)
$(".enter-message").val('')
});
})
