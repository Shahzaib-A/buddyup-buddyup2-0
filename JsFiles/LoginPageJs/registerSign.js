//Import firebase and set up variables
//variables//variables
const original_password = document.querySelector('.password');
const confirm_password = document.querySelector('.confirm');
const email = document.querySelector('.email');
const sign_In_mail = document.querySelector('.signinEmail')
const sign_in_password = document.querySelector('.signinPassword')
// web app's Firebase configuration
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

function signUp(email,password){
  console.log("True")
  firebase.auth().fetchSignInMethodsForEmail(email).then((sim)=>{ //sim -> Sign In Method
    if(sim.indexOf(firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD) == -1){
       firebase.auth().createUserWithEmailAndPassword(email,password).then(function(user){
          firebase.auth().onAuthStateChanged(function(user){
            user.sendEmailVerification();
            //universal notification
            alert("Email was sent to : " + email + " to verify your account" + '\r\n' + "Please verify then log in.")
            window.location = "index.html"
          })
       }).catch(function(error){
        let errorCode = error.code
        if(errorCode == "auth/weak-password"){
          alert("Password is weak")
        }
      })
    } else{
      alert("Not verified")
      $(document).ready(function(){
        $(".email").addClass("error");
        setTimeout(function(){
          $(".email").removeClass("error");
        },500)
      });
      // alert(email)

      email.value = "";
      email.placeholder = "Email is already registered";
      // email.style.borderColor = "red";
      email.style.borderColor = "red";
    }
  })
}

function sign_In(email,password) {
  firebase.auth().signInWithEmailAndPassword(email,password).then((userCred)=>{
    alert(userCred.user.emailVerified)
    if(userCred.user.emailVerified){
      sign_In_mail.value = "";
      sign_in_password.value = "";
      window.open("Home.html","_blank")
    }
    else{
      // $(document).ready(function(){
      //   $(".email").addClass("error");
      //   setTimeout(function(){
      //     $(".email").removeClass("error");
      //   },500)
      // });
      email.value = "";
      email.placeholder = "Email not verified";
      email.style.borderColor = "red";
      // firebase.auth().signOut()
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
        sign_In_mail.value = ""
        sign_In_mail.style.borderColor = "red";
        sign_In_mail.placeholder = "Email adress not registerd";
      }
      if(error == "auth/wrong-password"){
        $(document).ready(function(){
          $(".signinPassword").addClass("error");
          setTimeout(function(){
            $(".signinPassword").removeClass("error");
          },500)
        });
      sign_in_password.value = "";
      sign_in_password.style.borderColor = "red";
      sign_in_password.placeholder = "Incorrect password"
    }
  })
}


//Checking for validity and signUp
function register() {
  //check if valid email
  if (isNaN(email.value.split('@')[0]) || email.value.split('@')[1] != "pdsb.net" ) {
    email.value = "";
    email.placeholder = "Invalid email only @pdsb";
    email.style.borderColor = "red";
    return
  }
  //check if passwords match
  if (original_password.value.toString() == confirm_password.value.toString()) {
    signUp(email.value, original_password.value)
  }
  else if(original_password.value.toString() != original_password.value.toString()) {
    confirm_password.value = "";
    confirm_password.style.borderColor = "red";
    confirm_password.placeholder = "Passwords don't match";
    return
  }
}

//signin
function signIn(){
  const user = firebase.auth().currentUser
  sign_In(sign_In_mail.value.toString(),sign_in_password.value.toString());
}

//reset password
function sendResetPassword(){
  var email = prompt("Please enter your email")
  firebase.auth().sendPasswordResetEmail(email).then(function(){
      alert("password sent!!")
  }).catch(e=>{alert(e)})
}

//checking if password is right
confirm_password.addEventListener('input', letter => {
  let org_password = original_password.value;
  newPass = letter.target.value
  currentLetters = org_password.substring(0, newPass.length)
  if (newPass == org_password) {
    confirm_password.style.borderColor = "rgba(0,234,80,0.6)";
  } else if (newPass != org_password) {
    confirm_password.style.borderColor = "red";
  }
})

//reseting email placeholder when user types
email.addEventListener('input', letter => {
  email.style.borderColor = "rgba(0,234,80,0.6)";
  email.placeholder = "example@pdsb.net"
})


sign_In_mail.addEventListener('input', letter => {
  sign_In_mail.style.borderColor = "rgba(0,234,80,0.6)";
  sign_In_mail.placeholder = "Email"
})

sign_in_password.addEventListener('input',letter =>{
  sign_in_password.style.borderColor = "rgba(0,234,80,0.6)";
  sign_in_password.placeholder = "password"
})
