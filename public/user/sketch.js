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
      if (credentials.role == "USER") {
        $(`#chat-room-${credentials.roomNumber}`).append('<div><input class="message_input" id="user-input" placeholder="Type here" type="text" /><botton class="message_button" onclick="document.sendMessage()">Send</button></div>')
      }
    });

    socket.on('message', function(message) {
      // message format
      // {
      //   text: String
      //   roomNumber: Number
      //   senderName: String
      // }
      console.log('message', message)

      // TODO: insert messages based on room number
    });
  });

  // TODO: actually fill the text from a user input
  // $('.chat').append('<p><strong>' + data.user + '</strong>: ' + data.message + '</p>');

  // let input;
  // input = select('#message_input');


  // function keyPressed() {
  //   if (keyCode == ENTER) {
  //     input.value('');
  //   }
  // }

  document.sendMessage = function() {
    socket.emit('message', {
      text: $("#user-input").val(),
      roomNumber: document.credentials.roomNumber,
      senderName: document.credentials.name
    });
  };

});
