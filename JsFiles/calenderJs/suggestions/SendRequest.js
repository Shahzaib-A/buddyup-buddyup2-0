/* ---Getting user name */

async function sendMessage(user, subject, sendTo) {
  let html = `
  <li>
  <img src=${'../images/footerPics/buddyUp.jpg'} alt="">
    <div>
      <h2 class="name">BuddyUp</h2>
        <h2 class="message">
          ${user} asked for you to help in ${subject}
        </h2>
    </div>
  </li>
  `
  let messageObject = {
    messageToDisp: html,
    sendTo: sendTo,
    sender: user,
    checked: false
  }

  await sendToServer(messageObject, 'Private')
}

//Finds people based on status and makes sure it is not current user
async function findPeople(subject) {
  await firebase.database().ref(`upvote/${subject}`).once('value', async snapshot => {
    if (snapshot.exists()){
      //Sorts from greatest to least in terms of points
      let rep = Object.values(snapshot.val()).sort().reverse()
      //Reverses names as we reversed points, both are related
      let names = Object.keys(snapshot.val()).reverse()
      let validNames = []

      await firebase.database().ref('Users').once('value', users => {
        userObjs = Object.values(users.val())
        for (let i = 0; i < names.length; i++){
          for (let user = 0; user < userObjs.length; user++) {
            if (userObjs[user].name == names[i]){
              if (userObjs[user].online == 'false' && userObjs[user].name != active_user) {
                validNames.push(userObjs[user].name)
              }
            }
          }
        }
      })

    if(validNames.length > 0){
      addNotification(`Would you like to ask ${validNames.join(" ")} for help in ${subject}`, "Suggestion!", '', true)
    }

      $('.cls').unbind().click(async function(event) {
        switch (this.id) {
          case 'check':
            //Sending requests to all user's who are valid
            for (let i = 0; i < validNames.length; i++) {
              await sendMessage(active_user, subject, names[i])
            }
            //Delete notifcation
            notifcation = event.currentTarget.parentNode.parentNode
            notifcation.classList.add('animate-out')
            setTimeout(()=>{
              notifcation.remove()
            },500)

            break;
          case 'close':
            //Close notifcation
            notifcation = event.currentTarget.parentNode.parentNode
            notifcation.classList.add('animate-out')
            setTimeout(()=>{
              notifcation.remove()
            },500)
            break;
        }
      })
    }
  })
}
