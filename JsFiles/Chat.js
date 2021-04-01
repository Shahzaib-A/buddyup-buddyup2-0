// Hello world, The purpose of this script is to update the website
const sendRequests = ".friend-request"
async function getImage() {
  await firebase.storage().ref('/Users/' + firebase.auth().currentUser.uid + '/profile').getDownloadURL().then(imgUrl => {
    sessionStorage.setItem("URL", imgUrl)
  })
  const img = sessionStorage.getItem("URL");
  sessionStorage.removeItem("URL")
  return img
}
async function sendRequest(userToAdd) {
  let image = await getImage()
  firebase.database().ref('/Requests').push({
    senderImage: image,
    toUser: userToAdd,
    html: `
    <li class="frreq">
      <img src=${image} alt="" onclick = "test()">
    </li>
    `
  })
}
async function AddUser(userToFind) {
  let found = false
  firebase.database().ref('Users').orderByChild("name").equalTo(userToFind).once('value', s => {
    if (s.exists()) {
      s.forEach((async function(child) {
        if (child.key == firebase.auth().currentUser.uid) {
          setValue(sendRequests, "Can't add yourself")
        } else {
          let sendersImage = await getImage()

          firebase.database().ref('Requests').once("value", async s => {
            if (!s.val()) {
              await sendRequest(userToFind)
              setValue(sendRequests, "Sent request")
              return
            } else {
              s.forEach(x=>{
                if(x.val().senderImage == sendersImage  && x.val().toUser == userToFind){
                  found = true
                  return
                }
              })
              found? setValue(sendRequests, "aldready sent!") : await sendRequest(userToFind)
            }
          })
        }
      }))
    } else {
      setValue(sendRequests, "User not found")
    }
  })
}
let isHidden = true
$('.closebtn').click(() => {
  // ---Animate add user box--- //
  switch (isHidden) {
    case true:
      $(".fr-request").animate({
        top: '75%'
      }, 1000, () => {
        isHidden = false
      })
      break
    default:
      $(".fr-request").animate({
        top: '90%'
      }, 1000, () => {
        isHidden = true
      })
  }
})

// ---Send reuests on enter key--- //
$(".friend-request").on("keyup", async (e) => {
  if (e.key === "Enter" || e.keyCode === 13) {
    let userToAdd = $(sendRequests).val()
    $(sendRequests).val("")
    await AddUser(userToAdd)
  }
})

resetValue(document.querySelector(sendRequests), "Enter username")
