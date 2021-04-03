$(".dropdown-content").hide()

$(".dropbtn").click(function (){
  let subjects = document.querySelectorAll(".dropdown-content").forEach(node =>{
    if($(this).parent().find(".dropdown-content").attr("class") != $(node).attr('class')){
      $(node).hide('slow')
    }
  })
  $(this).parent().find(".dropdown-content").toggle("Show")
})
