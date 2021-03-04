//display sign up
document.querySelector('.create').addEventListener('click', function() {
  document.querySelector('.signin').style.display = 'none';
  document.querySelector('.signup').style.display = 'block';
})
//display sign in
document.querySelector('.back').addEventListener('click', function() {
  document.querySelector('.signin').style.display = 'block';
  document.querySelector('.signup').style.display = 'none';
})
  
