$(document).ready(function () {

  $('.send-msg').click(function() {

    var $message = $('.chat-msg').val();

    var $elementMsg = $('#template .sent-msg').clone();

    $elementMsg.find('.sent-text').text($message);

    $('.current-chat').append($elementMsg);

    $('.chat-msg').val('');
  })
});
