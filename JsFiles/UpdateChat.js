const message = firebase.database().ref('general')
const isTaken = {};

// Add all to message once
root.once("value",function(snapshot){

  snapshot.forEach(function(elem){
    
  })

  snapshot.forEach(function(elem){
    document.querySelector(".sub-msg-container").innerHTML += `
      <li>${elem.val().message}</li>
    `
  })
})

// Add latest
root.orderByKey().limitToLast(1).on("value", function(snapshot) {
  snapshot.forEach(function(elem) {
      document.querySelector(".sub-msg-container").innerHTML += `
        <li>${elem.val().message}</li>
      `
  })
})
