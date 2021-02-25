
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
  if (isNaN(forms[2].value.split('@')[0])){
    forms[2].value = "";
    forms[2].placeholder = "Invalid email only @pdsb";
    forms[2].style.borderColor = "red";
    return
  }
  //check if passwords match
  if (forms[0].value.toString() == forms[1].value.toString()){
    signup(forms[2].value, forms[0].value)

  }

  else {
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
  console.log(org_password.length, original_password.value.length)
  if (newPass == org_password) {
    console.log("Valid")
    document.querySelector('.conforim').style.borderColor = "white";
  } else if (newPass != org_password) {
    console.log("Invalid")
    document.querySelector('.conforim').style.borderColor = "red";
  }
})

email.addEventListener('input',letter => {
  email.style.borderColor = "white";
})
