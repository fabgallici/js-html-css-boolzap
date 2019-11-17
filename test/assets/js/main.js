var emptyMsg = true;

function sendMsg() {
  var $message = $('.chat-msg').val();
  if ($message !== "") {
    var $elementMsg = $('#template .sent-msg').clone();

    $elementMsg.find('.sent-text').text($message);

    $('.chat-panel.is-active').append($elementMsg);

    $('.chat-msg').val('');
    emptyMsg = false;
  } else {
    emptyMsg = true;
  }
  
}

function sendHandleMsg() {
  var $message = $('.chat-msg').val();
  if ($message !== "") {
    var source = document.getElementById("handle-sent-template").innerHTML;
    var sendMsgTemplate = Handlebars.compile(source);

    var contextMsg = {msgTxt: $message};
    var htmlMsg = sendMsgTemplate(contextMsg);

    $('.chat-panel.is-active').append(htmlMsg);

    $('.chat-msg').val('');
    emptyMsg = false;
  } else {
    emptyMsg = true;
  }
}


function receivedMsg() {
  setTimeout(function() {
    if (!emptyMsg) {
      var $message = 'ok';
      var $elementMsg = $('#template .received-msg').clone();
      $elementMsg.find('.sent-text').text($message);
      $('.chat-panel.is-active').append($elementMsg);
      $('.chat-msg').val('');
    }
  }, 1000);

}

function receiveHandleMsg() {
  setTimeout(function () {
    if (!emptyMsg) {
      var $message = 'ok';
      var source = document.getElementById('handle-received-template').innerHTML;
      var receivedMsgTemplate = Handlebars.compile(source);
      var contextMsg = { msgTxt: $message };
      var htmlMsg = receivedMsgTemplate(contextMsg);

      $('.chat-panel.is-active').append(htmlMsg);

      $('.chat-msg').val('');
    }
  }, 1000);
}
//aggiunge nuovo contatto user-panel
function addContactHandle(name) {
  var source = document.getElementById('handle-addContact-template').innerHTML;
  var addContactTemplate = Handlebars.compile(source);
  var contextMsg = { dataName: name, contactName: name };
  var htmlMsg = addContactTemplate(contextMsg);
  $('.user-container').append(htmlMsg);

}
function addChatPanelHandle(name) {
  var source = document.getElementById('handle-chatPanel-template').innerHTML;
  var addChatPanelTemplate = Handlebars.compile(source);
  var contextMsg = { dataName: name };
  var htmlMsg = addChatPanelTemplate(contextMsg);
  $('.chat-container').append(htmlMsg);
}

//aggiorno current user nel right-wrapper -> menu-left -> current-user
//con valore user-panel attivo
function updateCurrentUser() {
  var $currentUser = $('.user-panel.is-active').html();
  $('.contact-menu-container .current-user').html($currentUser);
}


//---------Init Document Ready-------------
$(document).ready(function () {
  
  //init update current user
  updateCurrentUser();

  //footer -> input-container -> send-msg icon  send input msg on click
  // $('.send-msg').click(function() {
  //   // sendMsg();
  //   // receivedMsg();
  //   sendHandleMsg();
  //   receiveHandleMsg();
  // })

  document.getElementsByClassName('send-msg')[0].addEventListener('click', function () {
    sendHandleMsg();
    receiveHandleMsg();
  })

  //send input msg when press Enter , funziona anche con $(document)
  // $('input').keypress(function (e) {
  //   if(e.keyCode === 13) {
  //     // sendMsg();
  //     sendHandleMsg();
  //     receivedMsg();
  //   }
  // });
  document.querySelector('#inp-type-msg').addEventListener('keydown', function (e) {
    // console.log(e.code);
    if (e.keyCode === 13) {
      // sendMsg();
      sendHandleMsg();
      receivedMsg();
    }
  })

  //left user-panel on click switch current user chat-panel
  //refactor con eventDelegation per inserimento nuovo contatto new chat
  // $('.user-container').on('click', '.user-panel', function () {
  //   if (!$(this).hasClass('is-active')) {
  //     $('.user-panel').removeClass('is-active');
  //     $(this).addClass('is-active');

  //     //select data-name corresponding chat to active
  //     var $currentDataName = $(this).attr('data-name');
  //     console.log($currentDataName);
  //     //attivo la chat corrispondente all'user-panel selezionato
  //     $('.chat-panel').removeClass('is-active');

  //     $('.chat-panel[data-name="' + $currentDataName + '"]').addClass('is-active');

  //     //aggiorno current user nel right-wrapper -> menu-left -> current-user
  //     updateCurrentUser();
  //   }
  // }) 

  //left user-panel on click switch current user chat-panel - Vanilla js
  //refactor con eventDelegation per inserimento nuovo contatto new chat
  var userContainer = document.getElementsByClassName('user-container')[0];
  userContainer.addEventListener('click', function (e) {
    //risalgo dall evento per verificare se è uno degli user-panel
    var curUserPanel = e.target.closest('.user-panel'); //return null se elemento non esiste
    //controllo che abbia trovato riscontro positivo
    if (curUserPanel !== null) {
      if (!curUserPanel.classList.contains('is-active')) {  //ottimizzazione
        //rimuovo indistintamente a tutti gli user-panel la classe is-active
        document.querySelectorAll(".user-panel").forEach(function (el) {
          el.classList.remove("is-active");
        });
        //aggiungo is-active all user-panel corrente
        curUserPanel.classList.add('is-active');
        //select data-name corresponding chat to active
        var curDataName = curUserPanel.getAttribute('data-name');
        //rimuovo indistintamente a tutti i chat-panel la classe is-active
        document.querySelectorAll(".chat-panel").forEach(function (el) {
          el.classList.remove("is-active");
        });
        //attivo la chat corrispondente all'user-panel selezionato tramite attributo
        // document.querySelector('.chat-panel[data-name="' + curDataName + '"]').classList.add('is-active');
        document.querySelector(`.chat-panel[data-name="${curDataName}"]`).classList.add('is-active');
        //aggiorno current user nel right-wrapper -> menu-left -> current-user
        updateCurrentUser();
      }
    }
  })

  //search user left panel
  // $('.user-search-panel .search-user').on('keyup', function () {
  //   //salvo l'input corrente in una stringa
  //   var $searchUserInput = $(this).val();
  //   $searchUserInput = $searchUserInput.toLowerCase();

  //   //per ogni Nome Contatto vedo se è inclusa la stringa sopra, 
  //   //se non è inclusa nascondo il blocco panel contatto corrispondente o viceversa
  //   $('.user-panel-container .contact-name').each(function (index) {
  //     var $contactName = $(this).text();
  //     $contactName = $contactName.toLowerCase();
 
  //     if (!$contactName.includes($searchUserInput)) {
  //       $(this).parents('.user-panel-container').hide();
  //     } else {
  //       $(this).parents('.user-panel-container').show();
  //     }
  //   })
  // })

  //search user left panel
  document.querySelector('.user-search-panel .search-user').addEventListener('keyup', (e) => {
    //salvo l'input corrente in una stringa
    var searchUserInput = e.currentTarget.value.toLowerCase();
     //per ogni Nome Contatto vedo se è inclusa la stringa sopra, 
     //se non è inclusa nascondo il blocco panel contatto corrispondente o viceversa
    document.querySelectorAll('.user-panel-container .contact-name').forEach(function (el) {
      var contactName = el.textContent.toLowerCase();
      if(!contactName.includes(searchUserInput)) {
        el.closest('.user-panel-container').style.display = "none";
      } else {
        el.closest('.user-panel-container').style.display = "block";
      }
    })
  })

  //delete chat msg con event Delegation su chat-panel
  //hide-show arrow-down(delete-msg-menu) when mousenter/leave msg-container + fix del-msg-dropdown
  // $('.chat-container')
  //     .on('mouseenter', '.msg-container', function() {
  //       $(this).find('.delete-msg-menu').toggle();
  //     })
  //     .on('mouseleave', '.msg-container', function () {
  //       $(this).find('.delete-msg-menu').toggle();
  //       $(this).find('.delete-msg-dropdown').hide();
  //     })
  // //hide-show delete-msg-dropdown when click arrow-down(delete-msg-menu)
  // $('.chat-container').on('click', '.delete-msg-menu', function() {
  //   $(this).find('.delete-msg-dropdown').toggle();
  // })
  // //remove entire current msg on click delete-msg link
  // $('.chat-container').on('click', '.delete-msg-dropdown a', function() {
  //   $(this).closest('.delete-msg').remove();
  // })
  // //hide delete-msg-dropdown on mouseleave
  // $('.chat-container').on('mouseleave', '.delete-msg-dropdown', function () {
  //   $(this).hide();
  // })  
  //delete chat msg con event Delegation su chat-panel
  //hide-show delete-msg-dropdown when click arrow-down(delete-msg-menu)
  document.querySelector('.chat-container').addEventListener('click', function (e) { 
    var deleteMsgMenu = e.target.closest('.delete-msg-menu');
    if (deleteMsgMenu !== null) {
      deleteMsgMenu.querySelector('.delete-msg-dropdown').classList.toggle('active');
    }
  })
  //remove entire current msg on click delete-msg link
  // document.querySelector('.chat-container').addEventListener('click', function (e) {
  //   var deleteMsg = e.target.closest('.delete-msg-dropdown a');
  //   if (deleteMsg !== null) {
  //     deleteMsg.closest('.delete-msg').style.display = 'none';
  //   }
  // })

  document.querySelector('.chat-container').addEventListener('click', function (e) {
    if (e.target.matches('.delete-msg-menu')) {
      deleteMsgMenu.querySelector('.delete-msg-dropdown').classList.toggle('active');
    }
  })
  //remove entire current msg on click delete-msg link
  document.querySelector('.chat-container').addEventListener('click', function (e) {
    if (e.target.matches('.delete-msg-dropdown a')) {
      e.target.closest('.delete-msg').remove();
    }
  })

  // document.querySelector('.chat-container').addEventListener('mouseover', function (e) { //es. didattico, si poteva fare con semplice hover css
  //   console.log(e.target);
  //   var curMsgCont = e.target.closest('.msg-container');
  //   if (curMsgCont !== null) {
  //     console.log('match');
  //     e.target.querySelector('.delete-msg-menu').classList.toggle('active');
  //   }
  // })


  //Bonus: chat-menu left add Contact
  $('.new-chat-addContact').click(function () {
    //chiedo utente il nome e salvo var

    var userName = prompt('inserisci nome nuovo contatto');

    if (userName !== null && userName !== "") {
      //creo handlebar template addContact e appendo template al user-container
      addContactHandle(userName);
      //aggiungere eventDelegation evento click sul user panel
      //creo nuova chat con relativo data name
      addChatPanelHandle(userName);
    } else {
      alert('nome inserito non valido');
    }
    
  })

  // document.querySelector('.chat-msg').onkeypress = function (e) {
  //   if (e.keyCode === 13) {
  //     //sendMsg();
  //     //receivedMsg();
  //     sendHandleMsg();
  //     receiveHandleMsg();

  //   }
  // };

  // $('input').keyup(function (e) {
  //   if (e.which === 13) {
  //     sendMsg();
  //     receivedMsg();
  //   }
  // });
});

