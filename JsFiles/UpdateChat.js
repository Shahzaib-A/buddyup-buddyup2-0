// Add message to browser window
firebase.database().ref('general').orderByKey().limitToLast(1).on("value", function(snapshot){
  snapshot.forEach(function(elem){
    message = elem.val().message
    console.log(message)
  })
})
