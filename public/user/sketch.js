$(document).ready(function() {
  socket = io('/user');
  socket.on('connect', function() {
      console.log("Connected", socket.id);

    socket.on('setCredentials', function(credentials) {
      // credentials format
      // {
      //   role: String (USER or AUDIENCE)
      //   name: String
      //   roomNumber: Number
      // }
      console.log('credentials', credentials)
      document.credentials = credentials
      name = document.credentials.name
      room = document.credentials.roomNumber
      color = document.credentials.color
      document.getElementById("identification").textContent = `You are ${name}, in room ${room}.`
      // if (credentials.role == "USER") {
      //   $(`#chatroom-${credentials.roomNumber}`).append('<div><input class="message-input" id="user-input" placeholder="Type here" type="text" /><botton class="message-button" onclick="document.sendMessage()">Send</button></div>')
      // }
    });

    socket.on('message', function(message) {
      // message format
      // {
      //   text: String
      //   roomNumber: Number
      //   senderName: String,
      //   color: color
      // }
      console.log('message', message)
      // Add new message into the chatroom
      $(`#chatroom-messages-${message.roomNumber}`).append(`<p class="incoming" style=color:${message.color}><strong>${message.senderName}</strong>: ${message.text}</p>`)
      // Scroll to the bottom of the chatroom
      $(`#chatroom-messages-${message.roomNumber}`).scrollTop($(`#chatroom-messages-${message.roomNumber}`)[0].scrollHeight);
    });
  });

  document.sendMessage = function() {
    socket.emit('message', {
      text: $("#user-input-input").val(),
      roomNumber: document.credentials.roomNumber,
      senderName: document.credentials.name,
      color: color
    });

    $("#user-input-input").val('')
  };

  $('#user-input-input').keydown(function (event) {
    var keypressed = event.keyCode || event.which;
    if (keypressed == 13) {
      document.sendMessage();
    }
  });

});
