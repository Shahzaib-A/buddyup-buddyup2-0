function check(){
  setTimeout(function() {
    if(!auth.currentUser){
        window.location = 'index.html'
      }
    else if(auth.currentUser){
      if(!auth.currentUser.emailVerified){
        window.location = 'index.html'
      }
    }
  },200);
}

window.onunload = function(){
  firebase.auth().signOut()
}
