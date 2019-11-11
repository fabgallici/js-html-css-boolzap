$(document).ready(function () {

  $('.send-msg').click(function() {

    var $message = $('.chat-msg').val();

    var $elementMsg = $('#template .sent-msg').clone();

    $elementMsg.find('.sent-text').text($message);

    $('.chat-panel.is-active').append($elementMsg);

    $('.chat-msg').val('');
  })

  //User panel listener
  $('.user-panel').click(function() {
    $('.user-panel').removeClass('is-active');
    $(this).addClass('is-active');

    //select data-name corresponding chat to active
    $currentDataName = $(this).attr('data-name');
    console.log($currentDataName);
    $('.chat-panel').removeClass('is-active');
    // $('.chat-panel').attr("data-name='" + $currentDataName + "'").addClass(is-active);
    $('.chat-panel[data-name=" + $currentDataName + "]').addClass('is-active');
    // var $currentChat = $('.chat-panel').attr('data-name', $currentDataName);
    // console.log($currentChat);
    // if ($('.chat-panel').attr('data-name', $currentDataName)) {
    //   console.log('found');
    // }
  })

});
