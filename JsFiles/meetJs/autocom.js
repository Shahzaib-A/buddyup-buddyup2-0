/*



*/
document.querySelector(".enter-message").addEventListener("input", function() {
if(sessionStorage.getItem('chat') != "general"){
  list = ["!Leave"]
}else{
  list = ["!physics", "!math", "!computer-science", "!science", "!earth and space science", "!biology","!Leave"]
}
  // If substr matches then we need to display that option in the auto complete section
  // Then we have to bold the letters that match
  // If letter dont match we then have to delete that suggestion
  let searching = this.value
  let container = document.querySelector(".item")
  container.innerHTML = '';
  let suggestion = list.filter((array)=>{
    return array.toLowerCase().startsWith(searching.toLowerCase())
  })
  suggestion.forEach((el)=>{
    let element = document.createElement("div")
    element.innerHTML = `<strong>${searching}</strong>${el.substr(searching.length)}`
    element.setAttribute('class','list-item')
    container.appendChild(element)
  })

  if(searching.length == 0){
    container.innerHTML = ''
  }
  // For onclick https://stackoverflow.com/questions/2621835/detect-click-on-browser
  document.onclick= function(event) {
      if (event===undefined) event= window.event;
      var target= 'target' in event? event.target : event.srcElement;

      container.innerHTML = ''
  };
})
