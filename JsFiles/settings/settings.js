// code for database/ setting for buddy up website

// The following line of code is for the dark and light mode for the buddy up website

//Delete Account

//Logout
$('#name').keypress((e)=>{
  if(e.keyCode == 13 && $('#name').val() != ''){
    setTimeout(async()=>{
      var user = sessionStorage.getItem('username')
      await firebase.database().ref('Users/' + firebase.auth().currentUser.uid + '/name').set($('#name').val())
      sessionStorage.setItem('username',$('#name').val())
      alert(`User name sucsessfully changed to ${$('#name').val()}`)
      $('#name').val('')
    },1000)
  }
})

$('.btn1').click(()=>{
  firebase.auth().signOut()
  window.location = '../index.html'
  firebase.database().ref(sessionStorage.getItem('member')).remove()
})

//Dark mode
let ball = document.getElementById('toggleBall')
let counter = 1

ball.addEventListener('click', changeMode)

if(sessionStorage.getItem('toggleNav')*1%2 == 0){
  ball.style.transform = 'translateX(-35px)'
}else{
  ball.style.transform = 'translateX(0px)'
}

function changeMode(){
  counter++
  if(counter % 2 == 0 && sessionStorage.getItem('toggleNav')*1 %2 != 0){
      ball.style.transform = 'translateX(-35px)'
      sessionStorage.setItem('toggleNav',counter)
      sessionStorage.setItem('nav-color','Invert')
      location.reload()
  }
  else if(counter % 2 != 0 && sessionStorage.getItem('toggleNav')*1%2 == 0){
      ball.style.transform = 'translateX(0px)'
      sessionStorage.setItem('toggleNav',counter)
      sessionStorage.setItem('nav-color','Default')
      location.reload()
  }

}
