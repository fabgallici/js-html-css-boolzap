

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
  if (!emptyMsg) {
    var $message = 'ok';
    var $elementMsg = $('#template .received-msg').clone();
    $elementMsg.find('.sent-text').text($message);
    $('.chat-panel.is-active').append($elementMsg);
    $('.chat-msg').val('');
  }
  
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
    console.log($('.user-search-panel .search-user').val());
    // console.log($(this));
    // console.log($(this).val());
    var $searchUserInput = $('.user-search-panel .search-user').val();
    $searchUserInput = $searchUserInput.toLowerCase();


    $('.contact-name').each(function (index) {
      var $contactName = $(this).text();
      $contactName = $contactName.toLowerCase();
      console.log($contactName);
      if (!$contactName.includes($searchUserInput)) {
        // console.log('found');
        $(this).parents('.user-panel-container').hide();
      } else {
        $(this).parents('.user-panel-container').show();
      }
    })

  })

});
