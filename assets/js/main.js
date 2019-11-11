$(document).ready(function () {

  $('.send-msg').click(function() {

    var $message = $('.chat-msg').val();

    var $elementMsg = $('#template .sent-msg').clone();

    $elementMsg.find('.sent-text').text($message);

    $('.chat-panel').append($elementMsg);

    $('.chat-msg').val('');
  })

  //User panel listener
  $('.user-panel').click(function() {
    $('.user-panel').removeClass('is-active');
    $(this).addClass('is-active');
  })

});
