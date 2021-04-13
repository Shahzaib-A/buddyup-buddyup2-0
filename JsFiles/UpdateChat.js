    /*
----Idea(start)----
Update messages on the browser
----Idea(ends)-----

----Plan(start)----

  // ---Loading of messages--- //
    Firebase realtime triggers used to laod messages specificly the "once" trigger
      child-last.limitto one for updating sent messages
    // ---Styling of messages(html structure)--- //
    pretty simple update and send to firebase in html format so that it is just grab and Update
      this allows for faster load times and lower memory allocation
    once grabbed will store in local storage for even faster load times
----Plan(ends)-----

*/
// ---Function(s)--- //
function writeToBrowser(htmlStructure, objToWriteTo){
  htmlStructure.forEach((m)=>{
    document.querySelector(objToWriteTo).innerHTML+=m
  })
}

// ---Main program--- // (Note, is in setTimeout to make sure uid loads properly)
setTimeout(async () => {
  // ---Declare variables--- //
  const rootMessages = firebase.database().ref(sessionStorage.getItem('chat'))
  const rootDm = firebase.database().ref('Private/')
  var getOld = true
  var ignoreNew = false
  var fetchLatest = false
  var fetchold = true
  var user;
await firebase.database().ref('Users/' + firebase.auth().currentUser.uid).on('value', async function(snapshot) {
  user = snapshot.val().name
})

// ---ALL GENRAL MESAGES--- //
  // ---update sent message--- //
  rootMessages.limitToLast(1).on("child_added", async (snapshot) => {
    if (ignoreNew) {
      document.querySelector('.discussion').innerHTML += snapshot.val().messageToDisp
      var objDiv = document.querySelector(".discussion");
      objDiv.scrollTop = objDiv.scrollHeight;
      if(sessionStorage.getItem('cTab') == 'meet'){
          if(sessionStorage.getItem('cTab') == 'meet' && sessionStorage.getItem('chat') != 'general'){
            if(snapshot.val().readby.split(" ").indexOf(user) == -1){
              await firebase.database().ref(`${sessionStorage.getItem('chat')}/${snapshot.key}/readby`).set(`${snapshot.val().readby} ${user}`)
            }
        }
      }
      getOld = false
    }
  })

  // ---Load all messages--- //
  await rootMessages.on('child_added',async snapshot => {
    if(getOld){
        document.querySelector('.discussion').innerHTML += snapshot.val().messageToDisp
        var objDiv = document.querySelector(".discussion");
        objDiv.scrollTop = objDiv.scrollHeight;
        if(sessionStorage.getItem('cTab') == 'meet' && sessionStorage.getItem('chat') != 'general'){
          if(snapshot.val().readby.split(" ").indexOf(user) == -1){
            await firebase.database().ref(`${sessionStorage.getItem('chat')}/${snapshot.key}/readby`).set(`${snapshot.val().readby} ${user}`)
          }
        }
  ignoreNew = false
  }
  })

// ---ALL PRIVATE MESSAGES--- //

await rootDm.limitToLast(1).on("child_added", async snapshot=>{
    if(fetchLatest){
      if(snapshot.val().sendTo == user || snapshot.val().sender == user){
        document.querySelector('.discussion').innerHTML += snapshot.val().messageToDisp
        var objDiv = document.querySelector(".discussion");
        objDiv.scrollTop = objDiv.scrollHeight;
        if(sessionStorage.getItem('cTab') == 'meet' && snapshot.val().sendTo == user){
          await firebase.database().ref(`Private/${snapshot.key}/checked`).set(true)
        }
      }
    fetchold = false
  }
})

await rootDm.on("child_added",async snapshot=>{
  if(fetchold){
    if(snapshot.val().sendTo == user || snapshot.val().sender == user){
      document.querySelector('.discussion').innerHTML += snapshot.val().messageToDisp
      var objDiv = document.querySelector(".discussion");
      objDiv.scrollTop = objDiv.scrollHeight;
      if(sessionStorage.getItem('cTab') == 'meet' && snapshot.val().sendTo == user){
        await firebase.database().ref(`Private/${snapshot.key}/checked`).set(true)
      }
    }
fetchLatest = true
}
})
}, 1700)
