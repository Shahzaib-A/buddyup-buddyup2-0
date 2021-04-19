let file = {}
//SignUp function
function chooseFile(e){
  file = e.target.files[0]
}

function signUp(email,password){

  firebase.auth().fetchSignInMethodsForEmail(email).then((sim)=>{ //sim -> Sign In Method
    //
    if(sim.indexOf(firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD) == -1){
      const root2 = firebase.database().ref('Users')
      root2.orderByChild("name").equalTo($('input[name=user]').val()).once("value", (snapshot) => {
        if(!snapshot.exists() && $('input[name=user]').val() != ""){
          firebase.auth().createUserWithEmailAndPassword(email,password).then(function(user){
             firebase.auth().onAuthStateChanged(async function(user){
               user.sendEmailVerification();
              await firebase.storage().ref('/Users/' + user.uid + `/profile`).put(file).then(()=>{
                 console.log("Uploaded")
               }).catch(err=>{
                 console.log("Awhhh not uploaded")
               })
               firebase.database().ref('/Users/' + user.uid).set({
                 name: document.querySelector('.user').value
               })

               alert("Email was sent to : " + email + " to verify your account" + '\r\n' + "Please verify then log in.")
               // window.location = "index.html"
             })
          }).catch(function(error){
           let errorCode = error.code
           if(errorCode == "auth/weak-password"){
             shake('input[name=password]')
             setValue('input[name=password]',"Weak password")
             $('input[name=confirmpassword]').val("")
           }
          })
        }
      else if(snapshot.exists()){
        shake('input[name=user]')
        setValue('input[name=user]',"Username aldready taken")
        $('input[name=user]').val("")
        }
      })
    }
    else{
      shake('input[name=username]')
      setValue('input[name=username]',"Email aldready registerd")
    }
  })

}



//Checking for validity and calls sign up
function register() {
  //check if valid email
  if (email.value.split('@')[1] != "pdsb.net" ) {
    // shake('input[name=username]')
    // setValue('input[name=username]',"Invalid email only @pdsb.net")
    // return
  }
  //check if passwords match
  if (original_password.value.toString() == confirm_password.value.toString()) {
    signUp(email.value, original_password.value)

  }
}
