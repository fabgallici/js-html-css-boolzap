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
  $('.send-msg').click(function() {
    // sendMsg();
    // receivedMsg();
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

  document.querySelector('.chat-msg').onkeypress = function (e) {
    if (e.keyCode === 13) {
      // sendMsg();
      // receivedMsg();
      sendHandleMsg();
      receiveHandleMsg();
      
    }
  };

  //left user-panel on click switch current user chat-panel
  // $('.user-panel').click(function() {

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
  //left user-panel on click switch current user chat-panel
  //refactor con eventDelegation per inserimento nuovo contatto new chat
  $('.user-container').on('click', '.user-panel', function () {
    if (!$(this).hasClass('is-active')) {
      $('.user-panel').removeClass('is-active');
      $(this).addClass('is-active');

      //select data-name corresponding chat to active
      var $currentDataName = $(this).attr('data-name');
      console.log($currentDataName);
      //attivo la chat corrispondente all'user-panel selezionato
      $('.chat-panel').removeClass('is-active');

      $('.chat-panel[data-name="' + $currentDataName + '"]').addClass('is-active');

      //aggiorno current user nel right-wrapper -> menu-left -> current-user
      updateCurrentUser();
    }
  }) 

  //search user left panel
  $('.user-search-panel .search-user').on('keyup', function () {
    //salvo l'input corrente in una stringa
    var $searchUserInput = $(this).val();
    $searchUserInput = $searchUserInput.toLowerCase();

    //per ogni Nome Contatto vedo se è inclusa la stringa sopra, 
    //se non è inclusa nascondo il blocco panel contatto corrispondente o viceversa
    $('.user-panel-container .contact-name').each(function (index) {
      var $contactName = $(this).text();
      $contactName = $contactName.toLowerCase();
 
      if (!$contactName.includes($searchUserInput)) {
        $(this).parents('.user-panel-container').hide();
      } else {
        $(this).parents('.user-panel-container').show();
      }
    })

  })

  //delete chat msg con event Delegation su chat-panel
  //hide-show arrow-down(delete-msg-menu) when mousenter/leave msg-container + fix del-msg-dropdown
  $('.chat-container')
      .on('mouseenter', '.msg-container', function() {
        $(this).find('.delete-msg-menu').toggle();
      })
      .on('mouseleave', '.msg-container', function () {
        $(this).find('.delete-msg-menu').toggle();
        $(this).find('.delete-msg-dropdown').hide();
      })
  //hide-show delete-msg-dropdown when click arrow-down(delete-msg-menu)
  $('.chat-container').on('click', '.delete-msg-menu', function() {
    $(this).find('.delete-msg-dropdown').toggle();
  })
  //remove entire current msg on click delete-msg link
  $('.chat-container').on('click', '.delete-msg-dropdown a', function() {
    $(this).closest('.delete-msg').remove();
  })
  //hide delete-msg-dropdown on mouseleave
  $('.chat-container').on('mouseleave', '.delete-msg-dropdown', function () {
    $(this).hide();
  })  


  //Bonus: chat-menu left add Contact
  $('.new-chat-addContact').click(function () {
    //chiedo utente il nome e salvo var

    var userName = prompt('inserisci nome nuovo contatto');
    console.log(userName);
    console.log(typeof userName);
    // if (userName !== null) {
    //   console.log("username non e null");
    // } else {
    //   console.log("username e null");
    // }
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


//hide-show arrow-down(delete-msg-menu)
//old version, divisa in due per risolvere piccolo bug hover su msg-dropdown (se esco top dopo click su msg-menu)
// $('.chat-panel').on('mouseenter mouseleave', '.delete-msg', function () {
//   $(this).find('.delete-msg-menu').toggle();
//   // $(this).hide();
// })

  // $('input').keyup(function (e) {
  //   if (e.which === 13) {
  //     sendMsg();
  //     receivedMsg();
  //   }
  // });
});

