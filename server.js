let port = process.env.PORT || 8000;
let express = require('express');
let app = express();
let server = require('http').createServer(app).listen(port, function () {
  console.log('Server listening at port: ', port);
});

// Tell server where to look for files
app.use(express.static('public'));
app.get('/', (req, res) => res.redirect('/user'));

// Create socket connection
let io = require('socket.io').listen(server);

// Listen for individual clients to connect
io.sockets.on('connection', function (socket) {

  console.log("We have a new client: " + socket.id);

  // TODO:
  // this will be filled with a generated username for the user,
  // room number, and list of prompts to choose
  socket.emit('setCredentials', { 
    name: 'Schuyler',
    roomNumber: 3,
    prompts: [
      'prompt1',
      'prompt2',
      'prompt3',
      'prompt4',
      'prompt5',
    ]
    
  });

  // When receiving message from users, we simply pass them forward
  // to all the other users
  socket.on('message', function (message) {
    // message format
    // {
    //   text: String
    //   roomNumber: Number
    //   senderName: String
    // }
    io.sockets.emit('message', message);
  })

  // Listen for this client to disconnect
  socket.on('disconnect', function () {
    console.log("Client has disconnected " + socket.id);
  })
})