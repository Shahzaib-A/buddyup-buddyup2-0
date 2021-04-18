//reset password
function sendResetPassword(){
  var email = prompt("Please enter your email")
  firebase.auth().sendPasswordResetEmail(email).then(function(){
      alert("password reset sent")
  }).catch(e=>{alert(e)})
}
