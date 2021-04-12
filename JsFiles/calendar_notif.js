/*
  ---Notifications---
  Deadlines that were not completed
  Chat Notifications (Dm's)
  Nearing deadlines
  Subject Notifications
  Help Notifications (People who are good in a subject that you need help with)
*/

/* ---Chat Notifications--- */
/* ---Private messages--- */
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

    }
  })

  // ---Load all messages--- //
  await rootMessages.once('value',snapshot => {
    let data = snapshot.val()
    for(let i in data){

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
          console.log(x.val())
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
      console.log(x.val())
    }
  })
})
ig2 = false
})

}, 1000)
