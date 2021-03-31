// Hello world, The purpose of this script is to update the website
const sendRequests = ".friend-request"

async function AddUser(userToFind){
firebase.database().ref('Users').orderByChild("name").equalTo(userToFind).once('value',s=>{
  if(s.exists()){
    s.forEach((function(child) {
       if(child.key == firebase.auth().currentUser.uid){
        setValue(sendRequests,"Can't add yourself")
       }
       else{
         //Just add it to person pending
         setValue(sendRequests,"Sent request")
       }
    }))
  }
  else{
    setValue(sendRequests,"User not found")
  }
})
}
let isHidden = true
$('.closebtn').click(()=>{
  // ---Animate add user box--- //
  switch(isHidden){
    case true:
    $(".fr-request").animate({top: '75%'},1000,()=>{isHidden = false})
    break
    default:
    $(".fr-request").animate({top: '90%'},1000,()=>{isHidden = true})
  }
})

// ---Send reuests on enter key--- //
$(".friend-request").on("keyup",async(e)=>{

  if(e.key === "Enter" || e.keyCode === 13){
    let userToAdd = $(sendRequests).val()
    $(sendRequests).val("")
    await AddUser(userToAdd)
  }
})

resetValue(document.querySelector(sendRequests),"Enter username")
