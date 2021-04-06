//signIn function
function sign_In(email,password) {
  //set Persistence type
  firebase.auth().signInWithEmailAndPassword(email,password).then((userCred)=>{
    if(userCred.user.emailVerified){
      sign_In_mail.value = "";
      sign_in_password.value = "";
      window.open("../HtmlFiles/calendar.html")
    }
    else{
      shake('[name=signinusername]')
      setValue('input[name=signinusername]',"Email not verified")
      firebase.auth().signOut()
    }
  }).catch((error)=>{
      error = error.code
      if(error == "auth/user-not-found"){
        shake('input[name=signinusername]')
        setValue('input[name=signinusername]',"Email adress not registerd")
      }
      if(error == "auth/wrong-password"){
        shake('input[name=signinpassword]')
        setValue('input[name=signinpassword]',"Wrong password")
    }
  })
}

//signin
function signIn(){
  sign_In(sign_In_mail.value.toString(),sign_in_password.value.toString())
}


//Sets chat to general
sessionStorage.setItem("chat","general")

//Type writer effect

//---variables---//
