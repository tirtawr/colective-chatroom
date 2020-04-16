socket = io();
userData = {}

socket.on('connect', function () {
  console.log("Connected", socket.id);

  socket.on('setCredentials', function (credentials) {
    // credentials format
    // {
    //   name: String
    //   roomNumber: Number
    //   prompts: Array of String
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