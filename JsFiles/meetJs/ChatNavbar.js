// This is responsible for hiding a dropdown on the meet page  (Commented by Harsh)
$(".dropdown-content").hide()
// If the user clicks on the assigned button, the dropdown that was once hidden, apears. (Commented by Harsh)
$(".dropbtn").click(function() {
  let subjects = document.querySelectorAll(".dropdown-content").forEach(node => {
    // In this line, if the dropdown value is not equal to the value in the node, the dropdown will be hid (Commented by Harsh)
    if ($(this).parent().find(".dropdown-content").attr("class") != $(node).attr('class')) {
      $(node).hide('slow')
    }
  })
  $(this).parent().find(".dropdown-content").toggle("Show")
})

/* --- Add users to group on nav click--- */
$(".dropdown-content").click(async function() {
  //
  if (sessionStorage.getItem('chat') == 'general') {
    // Checks to see if group clicked has enough space for the member wanting to join. (Commented by Harsh)
    await check_space(`Groups/${this.className.split(" ")[1]}/${this.innerText.toLowerCase().split(" ").join("")}`)
  }
  else {
    alert('You are aldready in a group, please type !Leave in the chat to leave the current group')
  }
})
