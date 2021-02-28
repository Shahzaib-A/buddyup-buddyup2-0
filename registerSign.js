
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
  console.log("True")
  firebase.auth().fetchSignInMethodsForEmail(email).then((sim)=>{ //sim -> Sign In Method
    if(sim.indexOf(firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD) == -1){
       firebase.auth().createUserWithEmailAndPassword(email,password).then(function(user){
          firebase.auth().onAuthStateChanged(function(user){
            console.log("St")
            user.sendEmailVerification();
            alert("Email was sent to : " + email + " to verify your account" + '\r\n' + "Please verify then log in.")
            window.location = "index.html"
          })
       }).catch(function(error){
        let errorCode = error.code
        console.log(errorCode)
        if(errorCode == "auth/weak-password"){
          alert("Password is weak")
        }
      })
    } else{
      document.querySelector('.email').value = "";
      document.querySelector('.email').placeholder = "Email is already registered";
      document.querySelector('.email').style.borderColor = "red";
    }
  })
}

function sign_In(email,password) {
  firebase.auth().signInWithEmailAndPassword(email,password).then((userCred)=>{
    if(userCred.user.emailVerified){
      window.location = "Home.html"
    }
    else{
      alert("Email not verified")
      firebase.auth().signOut()
    }
  }).catch((error)=>{
      error = error.code
      if(error == "auth/user-not-found"){
         $(document).ready(function(){
           $(".signinEmail").addClass("error");
           setTimeout(function(){
             $(".signinEmail").removeClass("error");
           },500)
         });
        document.querySelector('.signinEmail').value = ""
        document.querySelector('.signinEmail').style.borderColor = "red";
        document.querySelector('.signinEmail').placeholder = "Email adress not registerd";
      }
      if(error == "auth/wrong-password"){
        $(document).ready(function(){
          $(".signinPassword").addClass("error");
          setTimeout(function(){
            $(".signinPassword").removeClass("error");
          },500)
        });
      document.querySelector('.signinPassword').value = "";
      document.querySelector('.signinPassword').style.borderColor = "red";
      document.querySelector('.signinPassword').placeholder = "Incorrect password"
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
const confirm_password = document.querySelector('.confirm');
const email = document.querySelector('.email');

//Checking for validity
function register() {
  const forms = [
    document.querySelector('.password'),
    document.querySelector('.confirm'),
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
    document.querySelector('.confirm').style.borderColor = "rgba(0,234,80,0.6)";
  } else if (newPass != org_password) {
    document.querySelector('.confirm').style.borderColor = "red";
  }
})

email.addEventListener('input', letter => {
  email.style.borderColor = "rgba(0,234,80,0.6)";
  email.placeholder = "example@pdsb.net"
})

//signin
function signIn(){
  const user = firebase.auth().currentUser
    sign_In(document.querySelector('.signinEmail').value.toString(),document.querySelector('.signinPassword').value.toString());
}

document.querySelector('.signinEmail').addEventListener('input', letter => {
  document.querySelector('.signinEmail').style.borderColor = "rgba(0,234,80,0.6)";
  document.querySelector('.signinEmail').placeholder = "Email"
})

document.querySelector('.signinPassword').addEventListener('input',letter =>{
  document.querySelector('.signinPassword').style.borderColor = "rgba(0,234,80,0.6)";
  document.querySelector('.signinPassword').placeholder = "password"
})

//reset password
function sendResetPassword(){
  var email = prompt("Please enter your email")
  firebase.auth().sendPasswordResetEmail(email).then(function(){
      alert("password sent!!")
  }).catch(e=>{alert(e)})
}
