socket = io();
userData = {}

socket.on('connect', function () {
  console.log("Connected", socket.id);

  socket.on('setCredentials', function (credentials) {
    // credentials format
    // {
    //   role: String (USER or AUDIENCE)
    //   name: String
    //   roomNumber: Number
    // }
    console.log('credentials', credentials)
    userData = credentials
  });

  socket.on('message', function (message) {
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
function sendMessage() {
  socket.emit('message', {
    text: 'the quick brown dog jumped over the lazy fox',
    roomNumber: userData.roomNumber,
    senderName: userData.name
  });
};