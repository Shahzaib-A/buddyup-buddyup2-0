setTimeout(async ()=>{
  /* ---scope variables--- */
  var ignore = true

  firebase.database().ref('Groups').limitToLast(1).on('value',snapshot=>{
    if(!ignore){
      console.log(snapshot.val())
    }
  })

  await firebase.database().ref('Groups').once('value',snapshot=>{
    console.log(snapshot.exists())
    ignore = false
  })
})
