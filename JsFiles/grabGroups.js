/*
  ---Purpose---
  to retrive and update all present groups in the drop down
  ---notes---
  Fireabase's once will allow us to query and update the data on onload
  firebase's on will allow us to to query and update the data when a update is detected
    Key note: this function will update when ever a change is noticed
      Added, leaving etc.
  This allows me to grab all subjects (used to target div class usign template literal)
  This also allows me to use teh Object constructor to see how groups there are per ssubject

  ---Main logic---

*/

setTimeout(async ()=>{
  function update(subjects, groupsInSubject){
    for(let key in groupsInSubject){
      let cGroup = Object.keys(groupsInSubject[key]).map(x => x = x.replace(/[^0-9]/g, ""))
      document.querySelector(`.${subjects[key]}`).innerHTML = ''
      for(let i = 0; i<cGroup.length;i++){
        let a_tag = document.createElement('a')
        a_tag.innerHTML = `Group ${cGroup[i]}`
        document.querySelector(`.${subjects[key]}`).appendChild(a_tag)
      }
    }
  }

  /* ---scope variables--- */
  const classes = ['.math','.science','.physics','.computer-science','.biology','.chemistry','.earth']
  var ignore = true
  let groupBars = document.querySelectorAll('.dropdown-content')
  let groupsPerSubj;

  firebase.database().ref('Groups').on('value',snapshot=>{
    if(!ignore){
      try{
        let subjects = [...Object.keys(snapshot.val())]
        let groupsPerSubj = Object.keys(snapshot.val()).map(x => x = snapshot.val()[x])
        update(subjects, groupsPerSubj)
      }catch(err){
        for(let i in classes){
          try{
            document.querySelector(classes[i]).innerHTML = ''
          }
          catch(err){}
        }
        }
    }
  })

  await firebase.database().ref('Groups').once('value',snapshot=>{
    if(snapshot.exists()){
      let subjects = [...Object.keys(snapshot.val())]
      let groupsPerSubj = Object.keys(snapshot.val()).map(x => x = snapshot.val()[x])
      update(subjects, groupsPerSubj)
    }
    ignore = false
  })
})
