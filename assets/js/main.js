

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
    var $message = 'ciao';
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
    $('.chat-panel').removeClass('is-active');
  
    $('.chat-panel[data-name="' + $currentDataName + '"]').addClass('is-active');

  })

});
