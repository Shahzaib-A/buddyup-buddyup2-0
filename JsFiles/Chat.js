// Hello world, The purpose of this script is to update the website
const sendRequests = ".friend-request"

async function AddUser(userToFind){
firebase.database().ref('Users').orderByChild("name").equalTo(userToFind).once('value',s=>{
  if(s.exists()){
    s.forEach((function(child) {
       if(child.key == firebase.auth().currentUser.uid){
        shake(sendRequests)
        setValue(sendRequests,"Can't add yourself")
       }
       else{
         //Just add it to person pending
         setValue(sendRequests,"Sent request")
       }
    }))
  }
  else{
    shake(sendRequests)
    setValue(sendRequests,"User not found")
  }
})
}
$(".fr-request").hide()

$('.addUser').click(()=>{
  $(".fr-request").toggle("")

  $(sendRequests).on("keyup",async(e)=>{
    if(e.key === "Enter" || e.keyCode === 13){
      let userToAdd = $(sendRequests).val()
      $(sendRequests).val("")
      await AddUser(userToAdd)
    }
  })
})

resetValue(document.querySelector(sendRequests),"Enter username")
