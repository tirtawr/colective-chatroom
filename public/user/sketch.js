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
      text: 'the quick brown dog jumped over the lazy fox',
      roomNumber: document.credentials.roomNumber,
      senderName: document.credentials.name
    });
  };

});
