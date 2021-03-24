  $(".send").click(function(){
    alert(firebase.auth().currentUser.uid)

  // firebase.database().ref('Users/').on('value',function(snapshot){
  //   alert(snapshot.digits)
  // });

  let messageObject = {
      message: $(".enter-message").val()
  }
  sendToServer(messageObject)
})
