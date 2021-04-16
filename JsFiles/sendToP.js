/*

*/
sessionStorage.setItem('cTab',"meet")
/* ---Variables--- */
var user;
/* ---Getting user name */
setTimeout(()=>{
  firebase.database().ref('Users/' + firebase.auth().currentUser.uid).on('value', async function(snapshot) {
    user = snapshot.val().name
  })
},2000)

/* ---Badword filter--- */
function cleanMessage(message){
/* ---Splits and uses map to go through the word and if a word is mathced it splits that word by chars and uses a sub map and replaces it with *'s */
message = message.split(" ").map(x => badWords.indexOf(x) != -1? x = (x.split("").map(c => c = '*')).join(""): x = x).join(" ")
return message
}

/* ---Sends to s certain part of the server--- */
function sendToServer(obj, path = sessionStorage.getItem('chat')){
  /* ---Sets a random key so that data does not get overwritten--- */
  autoId = firebase.database().ref('users').push().key
  /* ---Actully updates the server---  */
  firebase.database().ref(`${path}/` + autoId.toString()).set(obj)
}

/* ---Probably going to put this with the firebase username collection to keep it simple and for persormace--- */
async function getImage(){
    /* ---Grabs image url from firebase storage--- */
    await firebase.storage().ref('/Users/' + firebase.auth().currentUser.uid + '/profile').getDownloadURL().then(imgUrl=>{
      /* ---Using sessionStorage probably a bad thing should just input into variable---*/
      sessionStorage.setItem("URL",imgUrl)
    })
    const img = sessionStorage.getItem("URL");
    sessionStorage.removeItem("URL")
    return img
  }

async function upVote(user){
  await firebase.database().ref(`upvote/${sessionStorage.getItem('chat').split('/')[1]}/${user}`).once('value',async snapshot=>{
      await firebase.database().ref(`upvote/${sessionStorage.getItem('chat').split('/')[1]}/${user}`).set(snapshot.val()*1+1)
  })
}

async function downVote(user){
  await firebase.database().ref(`upvote/${sessionStorage.getItem('chat').split('/')[1]}/${user}`).once('value',async snapshot=>{
      await firebase.database().ref(`upvote/${sessionStorage.getItem('chat').split('/')[1]}/${user}`).set(snapshot.val()*1-1)
  })
}

/* ---Find out if the message is a special message (private, creation of group)--- */
function isSpecial(message){
  /* ---Grab first letter to determine type of message--- */
  type = message.split(" ")[0].split("")[0]
  /* ---Return type of message and value of message---  */
  if(message.split(" ")[0] == "@moderate"){
    return ["m",message.split(" ")[1]]
  }
  else if(message.split("^")[0] == "" && message.split("^")[2] == ""){
    return['u',message.split("^")[1]]
  }

  else if(message.split("/")[0] == "" && message.split("/")[2] == ""){
    return['d',message.split("/")[1]]
  }

  else if( message.split(" ")[0] != "@moderate" && type == "@"){
    return ["p",message.split(" ")[0].replace("@","")]
  }
  else if(type == "!"){
    return [message.split(" ")[0].replace("!","") != "Leave"? "gr":"leave",message.split(" ")[0].replace("!","")]
  }
  return ["gen","N/A"]
}

/* ---Determine if group is valid--- */
function isValidGroup(selectedGroup){
  list = ["physics", "math", "computer-science", "science", "earth", "biology","chemistry","earth and space science"]
  return list.indexOf(selectedGroup.toLowerCase()) != -1
}

async function check_space(path, len_wan = false){
  await firebase.database().ref(path).once('value',snapshot=>{
    if(Object.keys(snapshot.val()["Members"]).length < 5 && !len_wan){
      createGroup(path)
    }
    else if( Object.keys(snapshot.val()["Members"]).length >= 5 && !len_wan){
      alert('This group is currently full, please try again at a later time')
    }
    sessionStorage.setItem('numMembers',Object.keys(snapshot.val()["Members"]).length)
  })
}

// ---Check and remove from other groups--- //
async function createGroup(path){
  /* ---Variables--- */
  var mnub = Math.random().toString().substring(0,7).split(".")[1]
  var found = false

  await firebase.database().ref(`${path}/Members`).child(`member${mnub}`).set(user)
  sessionStorage.setItem('chat',`${path}/messages`)
  sessionStorage.setItem('member',`${sessionStorage.getItem('chat').replace('message',"Member")}/member${mnub}`)
  location.reload()
}

async function newGroup(selectedGroup){
  selectedGroup = selectedGroup.toLowerCase()
  await firebase.database().ref("Groups").once('value',async snapshot=>{

    if(snapshot.exists()){
    if(snapshot.val()[selectedGroup] != undefined){
    /* ---I reliaze this is not good practice, but I did this because it would otherwise make the code messy--- */
    /* Btw this is to determine what groups are full and what groups are not full --- Did it this way so that, groups woould fill evenly */
    groupFull = Object.keys(snapshot.val()[selectedGroup]).map((el,i) => el = Object.keys(snapshot.val()[selectedGroup][el].Members).length < 5?[Object.keys(snapshot.val()[selectedGroup])[i],false]:[Object.keys(snapshot.val()[selectedGroup])[i],true])
    groupEnterd = false

    /* ---Determine what groups have spaces (What groups have been skipped(ex. grp1 grp 3 -> grp2 would be recognized as skipped))--- */
    for(var i = 0;i<groupFull.length;i++){
      if(!groupFull[i][1]){
        await createGroup(`Groups/${selectedGroup}/${groupFull[i][0]}`)
        groupEnterd = true
        break //Stupid thing almost broke everything
      }
    }

    /* ---Adds member to missing groups inorder to fill them up--- */
    if(groupFull[groupFull.length - 1][0].replace(/[^0-9]/g, "")*1 != groupFull.length && !groupEnterd){
      for(var i = 0; i< parseInt(groupFull[groupFull.length - 1][0].split("").reverse()[0]);i++){
        console.log(groupFull[i])
        if(groupFull[i] == undefined){
          await createGroup(`Groups/${selectedGroup}/group${i}`)
          break
        }
      }
    }

    // ---Determines that all groups are full, then makes a new one--- //
    else if(groupFull[groupFull.length - 1][0].replace(/[^0-9]/g, "")*1 == groupFull.length && !groupEnterd){
      await createGroup(`Groups/${selectedGroup}/group${groupFull[groupFull.length - 1][0].replace(/[^0-9]/g, "")*1+1}`)
    }
  }
  else{
    await createGroup(`Groups/${selectedGroup}/group1`)
  }
}
else{
  await createGroup(`Groups/${selectedGroup}/group1`)
}
})
}


$(".enter-message").keypress(async function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
      let profileImage = await getImage()
      let message = cleanMessage($(".enter-message").val())
      if(message != ""){
      let html = `
      <li>
      <img src=${profileImage} alt="">
        <div>
          <h2 class="name">${user}</h2>
            <h2 class="message">
              ${message}
            </h2>
        </div>
      </li>
      `
      let messageObject = {
        messageToDisp:html
      }

      //Determine type of message
      switch(isSpecial(message)[0]){

        case "m":
          reason = prompt('Reason for report :')
          alert('Thanks for your report, out team will take a look at this user')
          await firebase.database().ref('Report/').push({
            Report:isSpecial(message)[1],
            Reason:reason
          })
          break;

        case "u":
        if(sessionStorage.getItem('chat') != 'general'){
          await upVote(isSpecial(message)[1])
        }else{
          alert(`You can't up/down vote in general chat`)
        }
          break;

        case "d":
        if(sessionStorage.getItem('chat') != 'general'){
          await downVote(isSpecial(message)[1])
        }else{
          alert(`You can't up/down vote in general chat`)
        }
          break;

        case "p":
          messageObject.sendTo = isSpecial(message)[1]
          messageObject.sender = user
          messageObject.checked = false
          await sendToServer(messageObject,'Private/')
          break;

          case "leave":
             await check_space(sessionStorage.getItem('chat').split("/").slice(0,3).join('/'),true)
             if(sessionStorage.getItem('numMembers') == 1){
               await firebase.database().ref(sessionStorage.getItem('chat').split("/").slice(0,3).join('/')).remove()
             }
             else{
               await firebase.database().ref(sessionStorage.getItem('member')).remove()
             }
             sessionStorage.setItem('chat','general')
             sessionStorage.setItem('member',null)
             location.reload()
            break;

        case "gr":
          isGroupValid = isValidGroup(isSpecial(message)[1])
          if(isGroupValid && sessionStorage.getItem('chat') == 'general'){
            await newGroup(isSpecial(message)[1])
          }else{
            alert("Aldready in group and or group is not valid, please try again")
          }
          break

        default:
          if(sessionStorage.getItem('chat') != 'general'){
            messageObject.readby = user
          }
          await sendToServer(messageObject)
          break
      }
      $(".enter-message").val('')
      }
    }
});
