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

//reseting placeholders when user types
resetValue('.email',"example@pdsb.net")
resetValue('.signinEmail',"Email")
resetValue('.signinPassword',"password")
resetValue('.password',"password")
resetValue('.user',"Username")
