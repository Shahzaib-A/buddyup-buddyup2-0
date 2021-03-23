$(".send").click(function(){
  x = firebase.database().ref('/Users/MWVM7KWyTEC8YEiT2JI/name')
  alert(x)
  let messageObject = {
      message: $(".enter-message").val()
  }
})
