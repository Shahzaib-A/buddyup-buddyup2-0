/*
  ---Purpose---
  This Purpose of this script is to, suggest users who are strong in their subject subs for geo

  ---How it sugggestions work---
  Checks subject that is in current calendar first one
  Orders them by who is active
*/
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

// ---Main program--- // (Note, is in setTimeout to make sure uid loads properly)

/* ---Opening and closing of notification panel--- */
let hid = true
$('.close').click(function(){
  if(hid){
    document.querySelector('.notification-panel').style.transform = "translateX(0%)"
    hid = false
  }else{
    document.querySelector('.notification-panel').style.transform = "translateX(100%)"
    hid = true
  }
})

/* ---Add notification--- */

function addNotification(message, title){
  const notification = document.createElement("div")
  notification.classList.add('notification')
  notification.innerHTML = `
  <div class="cont">
      <h4 class="title">${title}</h4>
      <p class="description">${message}</p>
  </div>
  <button class="cls" aria-label="Dismiss notification"><i class="fas fa-times"></i></button>
  `
  const closeButton = document.querySelector('.cls')

  document.querySelector('.notif_list').prepend(notification)
}

addNotification('d','ds')

$('.cls').click(()=>{
  alert('yeaa')
})
function removeNotification(){

}

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

  // ---General messages/Group messages--- //
  // ---update sent message--- //
  rootMessages.limitToLast(1).on("child_added", async (snapshot) => {
    if (ignoreNew) {
      if (sessionStorage.getItem('cTab') == 'meet') {
        if (sessionStorage.getItem('chat') != 'general') {
          if (snapshot.val().readby.split(" ").indexOf(user) == -1) {
            console.log('Notification t1')
          }
        }
      }
      getOld = false
    }
  })

  // ---Load all messages--- //
  await rootMessages.on('child_added', async snapshot => {
    if (getOld) {
      if (sessionStorage.getItem('chat') != 'general') {
        if (snapshot.val().readby.split(" ").indexOf(user) == -1) {
          console.log('notification t2')
        }
      }
      ignoreNew = false
    }
  })

  // ---ALL PRIVATE MESSAGES--- //

  await rootDm.limitToLast(1).on("child_added", async snapshot => {
    if (fetchLatest) {
      if (snapshot.val().sendTo == user || snapshot.val().sender == user) {
        if (snapshot.val().sendTo == user && !snapshot.val().checked) {

        }
      }
      fetchold = false
    }
  })

  await rootDm.on("child_added", async snapshot => {
    if (fetchold) {
      if (snapshot.val().sendTo == user || snapshot.val().sender == user) {
        if (snapshot.val().sendTo == user && !snapshot.val().checked) {
          let image = snapshot.val().messageToDisp.split('<img')[1].split(`alt="">`)[0]
          let senderName = snapshot.val().messageToDisp.split(`<h2 class="name">`)[1].split('</h2>')[0]
          let html = `
          <li>
          <img src=${image} alt="">
            <div>
              <h2 class="name">${senderName}</h2>
                <h2 class="message">
                  Private messaged you
                </h2>
            </div>
          </li>
          `

        }
      }
      fetchLatest = true
    }
  })
}, 1700)
