/*
// --- plan --- //
  // ---Logic--- //
  Load all the friend requests
  once value loaded trigger
  On value trigger
*/
let ignore = true
  setTimeout(async ()=>{
  await firebase.database().ref('Users/' + firebase.auth().currentUser.uid).on("value",async snapshot=>{
      let uName = snapshot.val().name
      firebase.database().ref('/Requests').once("value").then(element=>{
        element.forEach(x=>{
          if(x.val().toUser == uName){
            document.querySelector(".topnav").innerHTML += x.val().html
          }
        })
        ignore = false
      })
      if(!ignore){
        await firebase.database().ref('/Requests').limitToLast(1).on("value").then(element=>{
          element.forEach(x=>{
            if(x.val().toUser == uName){
              document.querySelector(".topnav").innerHTML += x.val().html
            }
          })
        })
      }
    })
  },1000)


function test(){
  alert("YESS")
}
