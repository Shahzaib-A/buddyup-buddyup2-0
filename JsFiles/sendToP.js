/*
  ---Logic---
  When users types !subject they automaticly get put into a group that is not full
    And there sessionStorage automaticly gets set to the current chat they are in
    This way even if they leave to another chat there sessionStorage gets overwritten

  If all groups are full
    New group is made and sessionStorage is set to the current path
    Upon creation of groups, a reminder will be sent out to everyone to be respectful and not following that will result in a ban

  If no group is made for the specific subject then same protocol will be followed ^^

  new ban systyem act's like moderation systyem
    So you do @report user name for reason which will be filed as a report at this person
    From there we will have a server side script that notify our email saying that such and such person was misbehaing and we also get sender
    This way we can reduce false ban's

  ---Reason for abondaning prev thoughts---
  1. to complex
  2. Alot of redunent code
    -So many for loops and awaits slowing down performace
    -Ban systyem was flawed
      -If people group up on one person and could ban him or her for no reason
    -Probelems: not able to check if users have aldready joined groups
  ---Step for exucution---
  1.Check if the subject they want is aldready made
    1. -> If aldready exists, then we check if there is space
      ---There is space---
      We set the sessionStorage item chat to be the path of that chat so that they only get that sepecific chat's and refreshing wont boot back to general
      ---No space---
      We will create a new group, and set sessionStorage item of chat to that path
      we will then send a bot message stating please be respectful (maybe if time permits)
    2. -> said subject does not exist
      ---Should---
      follow same protocol for no space and there is a group
    3.If user clicks on a group that is too full, then user will be alerted

  2. Sending messages
    ---exucution---
    Sends to the path of chat in sessionStorage

  3. Delete user from member
    When user closes window member will be deletedd from group---
      ---Issue---
      if there is only one user and no message was sent entirety is deletedd
        ---Solution---
        Save groups under superclass of groups then go through each subject and check if a group is missing
          If a group is missing assign them to that group
          If a group is not missing go through the list and make sure it has 5 people or more
            If it does not simply add the user to that group$
            Else move on to the next group
          If all groups are full then make a new group
*/

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

/* ---Find out if the message is a special message (private, creation of group)--- */
function isSpecial(message){
  /* ---Grab first letter to determine type of message--- */
  type = message.split(" ")[0].split("")[0]
  /* ---Return type of message and value of message---  */
  if( type == "@"){
    return ["p",message.split(" ")[0].replace("@","")]
  }
  else if(type == "!"){
    return [message.split(" ")[0].replace("!","") != "Leave"? "gr":"leave",message.split(" ")[0].replace("!","")]
  }
  return ["gen","N/A"]
}

/* ---Determine if group is valid--- */
function isValidGroup(selectedGroup){
  list = ["physics", "math", "computer-science", "science", "earth", "biology"]
  return list.indexOf(selectedGroup.toLowerCase()) != -1
}

// ---Check and remove from other groups--- //
async function createGroup(path, special = [false]){
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
    console.log(Object.keys(snapshot.val()[selectedGroup]))
    /* ---I reliaze this is not good practice, but I did this because it would otherwise make the code messy--- */
    groupFull = Object.keys(snapshot.val()[selectedGroup]).map((el,i) => el = Object.keys(snapshot.val()[selectedGroup][el].Members).length < 5?[Object.keys(snapshot.val()[selectedGroup])[i],false]:[Object.keys(snapshot.val()[selectedGroup])[i],true])
    groupEnterd = false

    /* ---Determine what groups have spaces--- */
    for(var i = 0;i<groupFull.length;i++){
      if(!groupFull[i][1]){
        await createGroup(`Groups/${selectedGroup}/${groupFull[i][0]}`)
        groupEnterd = true
      }
    }
    /* ---Detmine if groups are missing--- */

    if(parseInt(groupFull[groupFull.length - 1][0].split("").reverse()[0]) != groupFull.length && !groupEnterd){
      console.log("Adding new group")
      for(var i = 0; i< parseInt(groupFull[groupFull.length - 1][0].split("").reverse()[0]);i++){
        if(groupFull[i] == undefined){
          await createGroup(`Groups/${selectedGroup}/group${i}`)
          break
        }
      }
    }
    else if(parseInt(groupFull[groupFull.length - 1][0].split("").reverse()[0]) == groupFull.length && !groupEnterd){
      await createGroup(`Groups/${selectedGroup}/group${parseInt(groupFull[groupFull.length - 1][0].split("").reverse()[0]) + 1}`)
    }
  }
  else{
    await createGroup(`Groups/${selectedGroup}/group1`)
  }
  groupMem = Object.keys(snapshot.val()[selectedGroup]).map((el,i) => el = Object.keys(snapshot.val()[selectedGroup][el].Members).length + 1)
}
else{
  await createGroup(`Groups/${selectedGroup}/group1`)
  groupMem = 1
}
  sessionStorage.setItem('groupMem',groupMem)
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
        case "p":
          messageObject.sendTo = isSpecial(message)[1]
          messageObject.sender = user
          await sendToServer(messageObject,'Private/')
          break;

          case "leave":
          console.log(sessionStorage.getItem('groupMem'))
            if(sessionStorage.getItem('groupMem') == 1){
              firebase.database().ref(sessionStorage.getItem('member').split('/').slice(0,3).join('/')).remove()
            }else{
              firebase.database().ref(sessionStorage.getItem('member')).remove()
            }
            sessionStorage.setItem("chat","general")
            sessionStorage.setItem('member',null)
            location.reload()
            break;

        case "gr":
          isGroupValid = isValidGroup(isSpecial(message)[1])
          if(isGroupValid && sessionStorage.getItem('chat') == "general"){
            await newGroup(isSpecial(message)[1])
          }else{
            alert("Aldready in group and or group is not valid, please try again")
          }
          break

        default:
          await sendToServer(messageObject)
          break
      }
      $(".enter-message").val('')
      }
    }
});
