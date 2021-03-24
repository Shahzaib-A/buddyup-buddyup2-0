//
function AddUser(obj){
  // alert(uid.toString())
  firebase.database().ref('/Users/').set(obj)
}

function check(){
  firebase.auth().onAuthStateChanged((user) => {
      if (user && auth.currentUser.emailVerified){
      } else {
        // User not logged in or has just logged out.
        window.location = '../index.html'
      }
  });
  console.log("Hello")
}

window.onunload = function(){
  firebase.auth().signOut()
}
