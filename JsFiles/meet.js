var isHidden = true
$(".icon").click(function(){
    switch (this.id){
      case "dm":
        $(".friendRq").fadeOut();
        isHidden= false
        break;
      case "public":
        if(!isHidden){
          $(".friendRq").hide().fadeIn()
          isHidden = true
        }
        break;
      case "add":
        alert("add contacts")
        break;
    }
})

$(".send").click(function(){
  let messageToSend = document.querySelector('.text').value.toString()
  let sender = auth.currentUser.uid.toString()
  proccesMessage(messageToSend,sender)
})
