async function addNotification(message, title,id,special,type){
  const notification = document.createElement("div")
  notification.classList.add('notification')
  if(!special){
  notification.innerHTML = `
  <div class="cont">
      <h4 class="title">${title}</h4>
      <p class="description">${message}</p>
  </div>
  <button class="cls" aria-label="Dismiss notification"><i class="fas fa-times"></i></button>
  <div class='id' style='display: none;'>${id}</div>
  <div class='type' style='display: none;'>${type}</div>
  `
}else{

  notification.innerHTML = `
  <div class="cont">
      <h4 class="title">${title}</h4>
      <p class="description">${message}</p>
  </div>

  <div class="buttons">
  <button id = 'close' class="cls" aria-label="Dismiss notification"><i class="fas fa-times"></i></button>
  <button id = 'check' class="cls" aria-label="Dismiss notification"><i class="fas fa-check"></i></button>
  </div>

  <div class='id' style='display: none;'>${id}</div>
  <div class='type' style='display: none;'>suggestion</div>
  `
}
  const closeButton = document.querySelector('.cls')

  document.querySelector('.notif_list').prepend(notification)


  //Remove notifcation, and do specific functions based on notification type
  document.querySelector('.cls').addEventListener('click', async function(event){
    //Get master container
    var notification = event.currentTarget.parentNode.querySelector('.type') != null?event.currentTarget.parentNode:event.currentTarget.parentNode.parentNode

    // //Closes notification
    //Checks type and exucutes corrosponding function
    if(notification.querySelector('.type').innerText == 'event'){
      let evnt = notification.querySelector('.id').innerText
      let date= notification.querySelector('.description').innerText.split(" ").slice(-3).join(" ")
      let notificatonList = [...document.querySelectorAll('.noteList li')]
      //Remove from firebase
      await firebase.database().ref('Users/' + firebase.auth().currentUser.uid + '/Events/' + date + '/' + evnt).remove()
      //remove from notification list
      for(var i = 0; i<notificatonList.length;i++){
        if(notificatonList[i].innerHTML != ''){
          //Extract note from innerHTML and if it is equal to the actual event then delete the note list(To-do section)
          if(notificatonList[i].innerHTML.split("<")[0] == evnt){
            notificatonList[i].remove()
          }
        }
      }

      //Add notificaiton closing animations
      notification.classList.add('animate-out')
      setTimeout(()=>{
        notification.remove()
      },500)

      //Remove form allEvents and reset underscore
      removeFromAllEvents(evnt, date)
    }

    //These are determining type of notification
    else if(notification.querySelector('.type').innerText == 'p_chat'){
      //Set readby true on notification close
      await firebase.database().ref(notification.querySelector('.id').innerText).set(true)
      notification.classList.add('animate-out')
      //Animate notifcation out
      setTimeout(()=>{
        notification.remove()
      },500)
    }

    //Same thing as private chat
    else if(notification.querySelector('.type').innerText == 'gr_chat'){
      //Update firebase to inform, user has acknowledged the message
      await firebase.database().ref(notification.querySelector('.id').innerText).once('value',snapshot=>{
        //Adds user name to readby to show that they have read the message
        firebase.database().ref(notification.querySelector('.id').innerText).set(`${snapshot.val()} ${active_user}`)
      })
      //Remomve notifcation
      notification.classList.add('animate-out')
      setTimeout(()=>{
        notification.remove()
      },500)
    }
  })
}
