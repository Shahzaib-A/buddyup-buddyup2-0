//SignUp function
function signUp(email,password){
  firebase.auth().fetchSignInMethodsForEmail(email).then((sim)=>{ //sim -> Sign In Method
    if(sim.indexOf(firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD) == -1){
       firebase.auth().createUserWithEmailAndPassword(email,password).then(function(user){
          firebase.auth().onAuthStateChanged(function(user){
            user.sendEmailVerification();
            digit = Math.random().toString().substring(2,7)
            digit = digit.substr(0,1) == 0? digit = digit.replace("0",Math.floor((Math.random() * (9-1) + 1).toString())):digit = digit;
            firebase.database().ref('/Users/' + user.uid).set({
              digits:digit,
              name: document.querySelector('.user').value
            })
            alert("Email was sent to : " + email + " to verify your account" + '\r\n' + "Please verify then log in.")
            window.location = "index.html"
          })
       }).catch(function(error){
        let errorCode = error.code
        if(errorCode == "auth/weak-password"){
          shake('input[name=password]')
          setValue('input[name=password]',"Weak password")
          $('input[name=confirmpassword]').val("")
        }
      })
    } else{
      shake('input[name=username]')
      setValue('input[name=username]',"Email aldready registerd")
    }
  })
}

//Checking for validity and calls sign up
function register() {
  //check if valid email
  if (email.value.split('@')[1] != "pdsb.net" ) {
    shake('input[name=username]')
    setValue('input[name=username]',"Invalid email only @pdsb.net")
    return
  }
  //check if passwords match
  if (original_password.value.toString() == confirm_password.value.toString()) {
    signUp(email.value, original_password.value)

  }
}
