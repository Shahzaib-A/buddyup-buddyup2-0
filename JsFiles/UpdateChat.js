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
  var ignore = true
  var ig2 = true
// ---ALL GENRAL MESAGES--- //
  // ---update sent message--- //
  rootMessages.limitToLast(1).on("child_added", (snapshot) => {
    if (!ignore) {
      document.querySelector('.discussion').innerHTML += snapshot.val().messageToDisp
      var objDiv = document.querySelector(".discussion");
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  })

  // ---Load all messages--- //
  await rootMessages.once('value',snapshot => {
    let data = snapshot.val()
    for(let i in data){
        document.querySelector('.discussion').innerHTML += data[i].messageToDisp
        var objDiv = document.querySelector(".discussion");
        objDiv.scrollTop = objDiv.scrollHeight;
    }
    ignore = false
  })

// ---ALL PRIVATE MESSAGES--- //

await rootDm.limitToLast(1).on("value", async snapshot=>{
    if(!ig2){
    await firebase.database().ref('Users/' + firebase.auth().currentUser.uid).on('value', async function(snapshots) {
      let user = snapshots.val().name
      snapshot.forEach(x => {
        if(x.val().sendTo == user || x.val().sender == user){
          document.querySelector('.discussion').innerHTML += x.val().messageToDisp
          var objDiv = document.querySelector(".discussion");
          objDiv.scrollTop = objDiv.scrollHeight;
        }
      })
    })
  }
})

await rootDm.once("value",async snapshot=>{
await firebase.database().ref('Users/' + firebase.auth().currentUser.uid).on('value', async function(snapshots) {
  let user = snapshots.val().name
  snapshot.forEach(x =>{
    if(x.val().sendTo == user || x.val().sender == user){
      document.querySelector('.discussion').innerHTML += x.val().messageToDisp
      var objDiv = document.querySelector(".discussion");
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  })
})
ig2 = false
})

}, 1000)
