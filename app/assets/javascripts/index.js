$(function() {

function appendUser(user) {
    var html = `<div class='chat-group-form__field--left'>
    <label class="chat-group-form__label" for="chat_group_チャットメンバーを追加">チャットメンバーを追加</label>
  </div>
  <div class='chat-group-form__field--right'>
    <div class='chat-group-form__search clearfix'>
      <input class='chat-group-form__input' id='user-search-field' placeholder='追加したいユーザー名を入力してください' type='text'>
    </div>
    <div id='user-search-result'></div>
  </div>`
}
  $('#user-search-field').on("keyup", function() {
      var input = $('#user-search-field').val();
      
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { search: input },
        dataType: 'json'
      })

      .done(function(users) {
        if (users.length !== 0) {
            users.forEach(function(user){
                appendUser(user);
            });
        }
        else {
            appendErrMsgToHTML("一致するユーザーが見つかりません。")
        } 
      })
      .fail(function() {
          alert('ユーザー検索に失敗しました');
      })
  });
});