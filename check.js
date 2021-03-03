var firebaseConfig = {
  apiKey: "AIzaSyAg3XtxHv7Qo50b3iIRUKG0xGvtOXWOkpA",
  authDomain: "buddyup-67607.firebaseapp.com",
  projectId: "buddyup-67607",
  storageBucket: "buddyup-67607.appspot.com",
  messagingSenderId: "998167329918",
  appId: "1:998167329918:web:3a32616855124af5ed6c2f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function check(){
  firebase.auth().onAuthStateChanged(authUser => {
       console.log(authUser)
       if(authUser != null){
       if(authUser.user.emailVerified){ //This will return true or false
         console.log('email is verified')
        }else{
            window.location = "index.html"
        }
      }else{
        window.location = "index.html"
      }
     })
}
