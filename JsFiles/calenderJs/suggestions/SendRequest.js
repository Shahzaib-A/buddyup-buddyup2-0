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


async function findPeople(subject) {
  await firebase.database().ref(`upvote/${subject}`).once('value', async snapshot => {
    // console.log(snapshot.exists(), subject)
    if (snapshot.exists()){
      let rep = Object.values(snapshot.val()).sort().reverse()
      let names = Object.keys(snapshot.val()).reverse()

      await firebase.database().ref('Users').once('value', users => {
        userObjs = Object.values(users.val())
        for (let i = 0; i < names.length; i++){
          for (let user = 0; user < userObjs.length; user++) {
            if (userObjs[user].name == names[i]) {
              if (userObjs[user].online == 'false' && userObjs[user].name != active_user) {
                names.splice(i, 1)
              }
            }
          }
        }
      })


     addNotification(`Would you like to ask ${names.join(" ")} for help in ${subject}`, "Suggestion!", '', true)

      $('.cls').unbind().click(async function(event) {
        switch (this.id) {
          case 'check':
            /* ---Getting user name */
            for (let i = 0; i < names.length; i++) {
              await sendMessage(active_user, subject, names[i])
            }
            notifcation = event.currentTarget.parentNode.parentNode
            notifcation.classList.add('animate-out')
            setTimeout(()=>{
              notifcation.remove()
            },500)

            break;
          case 'close':
            //Put in module fuctions
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
