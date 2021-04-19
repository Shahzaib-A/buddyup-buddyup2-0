// const userId = document.getElementById('userId');
// const firstname = document.getElementById('firstName');
// const lastname = document.getElementById('lastName');
// const age = document.getElementById('age');
// const updateBtn = document.getElementById('updateBtn');
// const removeBtn = document.getElementById('removeBtn');
// const SignOut = document.getElementById('SignOut');
//
// const database = firebase.database();
// const rootRef = database.ref('users');
//
// updateBtn.addEventListener('click', (e) => {
//   e.preventDefault();
//   const newData = {
//     //age: age.value,
//     first_name: firstName.value,
//     last_name: lastName.value
//   }
// //  root.Ref.child(userId.value).update(newData);
// const updates = {}
// updates['/users/' + userId.value] = newData;
// updates['/super-users/' + userId.value] = newData
// database.ref().update(updates);
// });
//
// // removeBtn.addEventListener('click', e => {
// //   e.preventDefault();
// //   rootRef.child(userId.value).remove()
// //   .then(() => {
// //     window.alert('user removed from database !');
// //   })
// //   .catch(error => {
// //       // console.error(error);
// //   });
// // });
//
// rootRef.once('value', snapshot => {
//  console.log(Object.keys(snapshot.val()));
// });
//
// rootRef.orderByChild('age').limitToFirst(1).on('value', snapshot => {
//   console.log(snapshot.val());
// } );
// // The following line of code is for the dark and light mode for the buddy up website

$( document ).ready(function() {

});
setTimeout(()=>{
  let ball = document.getElementById('toggleBall')
  let counter = 1
  let elements = [
    document.querySelector('.calendar'),
    document.querySelector('.meet'),
    document.querySelector('.settngs'),
    document.querySelector('.about'),
    document.querySelector('.logo')
  ]

  ball.addEventListener('click', changeMode)
  function changeMode(){
    counter++
    if(counter % 2 == 0){
        ball.style.transform = 'translateX(-35px)'
        for(let i = 0; i<elements.length;i++){
          elements[i].style.color = 'black'
        }
        document.querySelector("nav").style.background = '#fff'

    }
    else{
      ball.style.transform = 'translateX(0px)'
        for(let i = 0; i<elements.length;i++){
          console.log('running')
          elements[i].style.color = 'white'
        }
        document.querySelector("nav").style.background = '#222227'
    }
  }
},5000)

// // code for users to change there profile picture
// updateBtn.addEventListener( 'click', (e) => {
// firebase.storage().ref('users/' + firebase.auth().currentUser.uid + '/profile').put(file)
// })


//
// // code for current user to log out
// SignOut.addEventListener( 'click', (e) =>{
// firebase.auth().signOut()
// })
