// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyA-UeZ4OA74-uYY0a02FAnZl9VhyCO6v5E",
    authDomain: "hamdevproject-443aa.firebaseapp.com",
    projectId: "hamdevproject-443aa",
    storageBucket: "hamdevproject-443aa.appspot.com",
    messagingSenderId: "588745477271",
    appId: "1:588745477271:web:dbc2666b07beeeedac2dd2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // code for database/ setting for buddy up website
const userId = document.getElementById('userId');
const firstname = document.getElementById('firstName');
const lastname = document.getElementById('lastName');
const age = document.getElementById('age');
// const addBtn = document.getElementById('addBtn')
const updateBtn = document.getElementById('updateBtn');
const removeBtn = document.getElementById('removeBtn');
const SignOut = document.getElementById('SignOut');

const database = firebase.database();
const rootRef = database.ref('users');

// addBtn.addEventListener('click',(e) => {
//   e.preventDefault();
//   const autoId = roofRef.push().key
//   roofRef.child(autoId).set({
//     first_name: firstName.value,
//     last_name: lastName.value,
//     //age: age.value
//   })
// });

updateBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const newData = {
    //age: age.value,
    first_name: firstName.value,
    last_name: lastName.value
  }
//  root.Ref.child(userId.value).update(newData);
const updates = {}
updates['/users/' + userId.value] = newData;
updates['/super-users/' + userId.value] = newData
database.ref().update(updates);
});

removeBtn.addEventListener('click', e => {
  e.preventDefault();
  rootRef.child(userId.value).remove()
  .then(() => {
    window.alert('user removed from database !');
  })
  .catch(error => {
      // console.error(error);
  });
});

rootRef.child().on('child_changed', snapshot => {
 console.log(snapshot.val());
});


rootRef.once('value', snapshot => {
 console.log(Object.keys(snapshot.val()));
});

rootRef.orderByChild('age').limitToFirst(1).on('value', snapshot => {
  console.log(snapshot.val());
});
// The following line of code is for the dark and light mode for the buddy up website
let ball = document.getElementById('toggleBall')
let counter = 1

ball.addEventListener('click', changeMode)
function changeMode(){
  counter++
  if(counter % 2 == 0){
      ball.style.transform = 'translateX(-35px)'
      document.body.style.backgroundColor = 'black'
  }
  else{
      ball.style.transform = 'translateX(0px)'
      document.body.style.backgroundColor = 'white'
  }
}

// updateBtn.addEventListener( 'click', (e) =>)
firebase.storage().ref('users/' + auth.user.uid + '/profile').put(file).then

// code for current user to log out
SignOut.addEventListener( 'click', (e) =>{
firebase.auth().signOut()
})
