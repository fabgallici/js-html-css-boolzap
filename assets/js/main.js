

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

$(document).ready(function () {
  //send msg on button click
  // $('.send-msg').click(sendMsg);
  $('.send-msg').click(function() {
    sendMsg();
    receivedMsg();
  })



  //send msg press Enter
  $(document).keypress(function (e) {
    if(e.keyCode === 13) {
      sendMsg();
      receivedMsg();
    }
  });

  //User panel listener
  $('.user-panel').click(function() {
    $('.user-panel').removeClass('is-active');
    $(this).addClass('is-active');

    //select data-name corresponding chat to active
    $currentDataName = $(this).attr('data-name');
    console.log($currentDataName);
    //attivo la chat corrispondente all'user-panel selezionato
    $('.chat-panel').removeClass('is-active');
    
    $('.chat-panel[data-name="' + $currentDataName + '"]').addClass('is-active');

    //aggiorno current user nel contact menu
    var $currentUser = $(this).html();
    $('.contact-menu-container .current-user').html($currentUser);

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

  //delete chat msg


  //old version, divisa in due per risolvere piccolo bug hover su msg-dropdown (se esco top dopo click su msg-menu)
  // $('.chat-panel').on('mouseenter mouseleave', '.delete-msg', function () {
  //   $(this).find('.delete-msg-menu').toggle();
  //   // $(this).hide();
  // })
 
  $('.chat-panel')
      .on('mouseenter', '.delete-msg', function() {
        $(this).find('.delete-msg-menu').toggle();
      })
      .on('mouseleave', '.delete-msg', function () {
        $(this).find('.delete-msg-menu').toggle();
        $(this).find('.delete-msg-dropdown').hide();
      })

  // $('.chat-panel').on('mouseleave', '.delete-msg', function () {
  //   $(this).find('.delete-msg-menu').toggle();
  //   $(this).find('.delete-msg-dropdown').hide();
  //   // $(this).hide();
  // })

  $('.chat-panel').on('click', '.delete-msg-menu', function() {
    $(this).find('.delete-msg-dropdown').toggle();
  })

  $('.chat-panel').on('click', '.delete-msg-dropdown a', function() {
    $(this).closest('.delete-msg').remove();
  })

  $('.chat-panel').on('mouseleave', '.delete-msg-dropdown', function () {
    $(this).hide();
  })  
});
