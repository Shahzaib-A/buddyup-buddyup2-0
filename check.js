function check(){
  firebase.auth().onAuthStateChanged(authUser => {
     if(authUser.user.emailVerified){ //This will return true or false
       console.log('email is verified')
      }else{
          console.log('email not verified')
      }
  })
}
