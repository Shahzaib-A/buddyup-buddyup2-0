/*

  ---Logic---



*/


setTimeout(async ()=>{
  /* ---scope variables--- */
  var ignore = true
  let groupBars = document.querySelectorAll('.dropdown-content')
  let groupsPerSubj;

  firebase.database().ref('Groups').limitToLast(1).on('value',snapshot=>{
    if(!ignore){
      console.log(snapshot.val())
    }
  })

  await firebase.database().ref('Groups').once('value',snapshot=>{
    if(snapshot.exists()){

      let currentGroups = Object.keys(snapshot.val())
      groupsPerSubj = Object.keys(snapshot.val()).map(x => x = snapshot.val()[x])

      for(let i in currentGroups){
        for(let sector in groupBars){
            if(groupBars[sector].className){
              if(currentGroups[i] == groupBars[sector].className.split(" ")[1]){
                for(var count = 0; count<Object.keys(groupsPerSubj[i]).length;count++){
                console.log()
                let a_tag = document.createElement('a')
                a_tag.innerHTML = `Group${count+1}`
                groupBars[sector].appendChild(a_tag)
              }
            }
          }
        }
      }
    }
    ignore = false
  })

  await firebase.database().ref('Groups').on("child_removed", function(snapshot){
    
  });
})
