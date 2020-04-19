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
      // if (credentials.role == "USER") {
      //   $(`#chatroom-${credentials.roomNumber}`).append('<div><input class="message-input" id="user-input" placeholder="Type here" type="text" /><botton class="message-button" onclick="document.sendMessage()">Send</button></div>')
      // }
    });

    socket.on('message', function(message) {
      // message format
      // {
      //   text: String
      //   roomNumber: Number
      //   senderName: String
      // }
      console.log('message', message)
      $(`#chatroom-messages-${message.roomNumber}`).append(`<p class="incoming"><strong>${message.senderName}</strong>: ${message.text}</p>`)
    });
  });

  document.sendMessage = function() {
    socket.emit('message', {
      text: $("#user-input-input").val(),
      roomNumber: document.credentials.roomNumber,
      senderName: document.credentials.name
    });
  };

});
