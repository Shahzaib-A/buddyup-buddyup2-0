/*
Updates confirm password's border color in real time
To show if the password is wrong and when it is right.
*/
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

//reseting sign in mail placeholder when user types
sign_In_mail.addEventListener('input', letter => {
  sign_In_mail.style.borderColor = "rgba(0,234,80,0.6)";
  sign_In_mail.placeholder = "Email"
})

// reseting sign in confirm password placeholder when user types
sign_in_password.addEventListener('input',letter =>{
  sign_in_password.style.borderColor = "rgba(0,234,80,0.6)";
  sign_in_password.placeholder = "password"
})

//reseting sign up password
original_password.addEventListener('input',letter =>{
  original_password.style.borderColor = "rgba(0,234,80,0.6)";
  original_password.placeholder = "password"
})

user.addEventListener('input',letter=>{
  user.style.borderColor = "rgba(0,234,80,0.6)";
  user.placeholder = "Username"
})
