function check(){
  firebase.auth().onAuthStateChanged((user) => {
      if (user && auth.currentUser.emailVerified){
      } else {
        // User not logged in or has just logged out.
        window.location = '../index.html'
        firebase.database().ref(sessionStorage.getItem('member')).remove()
      }
  });
}

window.onunload = function(){
  firebase.auth().signOut()
}
