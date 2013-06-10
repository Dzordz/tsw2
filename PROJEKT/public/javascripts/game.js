var socket = io.connect();

$(document).ready(function(){

  socket.on('connect', function(){
    $("#userForm").submit(function(){
      var username = $('input[id=username]').val();
      socket.emit('join', {
        username: username
      });
    });
  });


  socket.on('usersList', function(data){
    $("#list").empty();
    var parseData = JSON.parse(data);
    parseData.list.forEach(function(el){
      $('#list').append('<li>' + el + '</li>');
    });
  });

  $(document).on('click','#chatConsoleButton',function(){
    var msg = $('#chatConsoleInput').val();
    var user = $('#username').text();
    socket.emit('message', {
      user: user,
      msg: msg
    });
  });

  socket.on('message2', function(data){
    var parseData = JSON.parse(data);
    $('#chatLogText').append('<br /><b>' + parseData.user + '</b>: ' + parseData.msg);
  });
});
