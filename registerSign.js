//Import firebase
// Your web app's Firebase configuration
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
const auth = firebase.auth()

//sign in. Basic idea is fetchSignInMethodsForEmail gives a password value. If it is non-existant. We can signup else we can


function signUp(email,password){
  firebase.auth().fetchSignInMethodsForEmail(email).then((sim)=>{
    if(sim.indexOf(firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD) == -1){
      const user = firebase.auth().createUserWithEmailAndPassword(email,password).catch(function(e){
        let errorCode = error.error
        if(errorCode == "auth/weak-password"){
          alert("Password is weak")
        }else{
          console.log("Sending user verification")
          console.log(user.user.sendEmailVerification())
        }
      })
    } else{
      document.querySelector('.email').value = "";
      document.querySelector('.email').placeholder = "Email is already registered";
      document.querySelector('.email').style.borderColor = "red";
    }
  })
}

//display sign up
document.querySelector('.create').addEventListener('click', function() {
  document.querySelector('.signin').style.display = 'none';
  document.querySelector('.signup').style.display = 'block';
})
//display sign in
document.querySelector('.back').addEventListener('click', function() {
  document.querySelector('.signin').style.display = 'block';
  document.querySelector('.signup').style.display = 'none';
})

//variables
const original_password = document.querySelector('.password');
const confirm_password = document.querySelector('.conforim');
const email = document.querySelector('.email');

//Checking for validity
function register() {
  const forms = [
    document.querySelector('.password'),
    document.querySelector('.conforim'),
    document.querySelector('.email')
  ]

  //check if valid email
  if (isNaN(forms[2].value.split('@')[0]) || forms[2].value.split('@')[1] != "pdsb.net" ) {
    forms[2].value = "";
    forms[2].placeholder = "Invalid email only @pdsb";
    forms[2].style.borderColor = "red";
    return
  }
  //check if passwords match
  if (forms[0].value.toString() == forms[1].value.toString()) {
    signUp(forms[2].value, forms[0].value)
  }
  else if(forms[0].value.toString() != forms[1].value.toString()) {
    forms[1].value = "";
    forms[1].style.borderColor = "red";
    forms[1].placeholder = "Passwords don't match";
    return
  }
}


//checking if password is right
confirm_password.addEventListener('input', letter => {
  let org_password = document.querySelector('.password').value;
  newPass = letter.target.value
  currentLetters = org_password.substring(0, newPass.length)
  if (newPass == org_password) {
    document.querySelector('.conforim').style.borderColor = "white";
  } else if (newPass != org_password) {
    document.querySelector('.conforim').style.borderColor = "red";
  }
})

email.addEventListener('input', letter => {
  email.style.borderColor = "white";
  email.placeholder = "example@pdsb.net"
})
