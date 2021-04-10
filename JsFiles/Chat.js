$(".dropdown-content").hide()

$(".dropbtn").click(function (){
  let subjects = document.querySelectorAll(".dropdown-content").forEach(node =>{
    if($(this).parent().find(".dropdown-content").attr("class") != $(node).attr('class')){
      $(node).hide('slow')
    }
  })
  $(this).parent().find(".dropdown-content").toggle("Show")
})

/* --- Add users to group on nav click--- */
$(".dropdown-content").click(async function (){
  if(sessionStorage.getItem('chat') == 'general'){
    newGroup(this.className.split(" ")[1])
    alert(sessionStorage.getItem('chat'))
  }else{alert('You are aldready in a group, please type !Leave in the chat to leave the current group')}
})
