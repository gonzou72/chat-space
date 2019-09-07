$(function(){
    function buildHTML(message){
        var image = ""
        message.image ? image = `<img src="${message.image}">` : image = ""

        var html =`<div class="message" data-message-id="${message.id}">
                      <div class="upper-message">
                        <div class="upper-message__user-name">
                         ${message.user_name}
                        </div>
                        <div class="upper-message__date">
                         ${message.date}
                        </div>
                      </div>
                      <div class="lower-message">
                        <p class="lower-message__content">
                         ${message.content}
                        </p>
                         ${image}
                      </div>
                    </div>`
        return html;
    }
    function scroll() {
        $('.messages').animate({
          scrollTop: $('.messages')[0].scrollHeight}, 200);
    }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
    })
    .done(function(user_new_message){
        var html = buildHTML(user_new_message);
        $('.messages').append(html);
        $('.content').val('');
        $('#new_message')[0].reset();
        $('.form__submit').prop('disabled', false);
        scroll()
    })
    .fail(function(){
        alert('だめです');
        $('.form__submit').prop('disabled', false)
    })
  })
  
  var reloadMessages = function() {
      last_message_id = $('.message').last().data("message-id");
    $.ajax({
      url: 'api/messages',
      type: 'GET',
      dataType: 'json',
      data: {last_id: last_message_id}
      })

    .done(function(messages) {
      messages.forEach(function(message){
        var insertHTML = buildHTML(message)     
      $('.messages').append(insertHTML)
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 200);
        })
      
    })

    .fail(function() {
      console.log('error');
    });
  };
  setInterval(reloadMessages, 5000);
});