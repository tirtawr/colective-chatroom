let port = process.env.PORT || 8000;
let express = require('express');
let app = express();
let server = require('http').createServer(app).listen(port, function () {
  console.log('Server listening at port: ', port);
});

const ChatRoom = require('./chatRoom.js')
const chatRoom = new ChatRoom()


// Tell server where to look for files
app.use(express.static('public'));
app.get('/', (req, res) => res.redirect('/user'));

// Create socket connection
let io = require('socket.io').listen(server);

// Listen for individual clients to connect and add them to user list
io.sockets.on('connection', function (socket) {

  console.log("We have a new client: " + socket.id);

  socket.emit('setCredentials', chatRoom.addUser(socket.id));

  // When receiving message from users, we simply pass them forward
  // to all the other sockets
  socket.on('message', function (message) {
  // message format
  //  {
  //    text: message.text,
  //    roomNumber: message.roomNumber,
  //    senderName: message.senderName
  //  }
    io.sockets.emit('message', message);
  })

  // Listen for this client to disconnect and remove from user list
  socket.on('disconnect', function () {
    console.log("Client has disconnected " + socket.id);
    chatRoom.removeUser(socket.id)
  })
})
