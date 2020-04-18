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

let userSockets = io.of('/user')
// Listen for individual clients to connect and add them to user list
userSockets.on('connection', function (userSocket) {

  console.log("We have a new user client: " + userSocket.id);

  userSocket.emit('setCredentials', chatRoom.addUser(userSocket.id));

  // When receiving message from users, we simply pass them forward
  // to all the other sockets
  userSocket.on('message', function (message) {
  // message format
  //  {
  //    text: message.text,
  //    roomNumber: message.roomNumber,
  //    senderName: message.senderName
  //  }
    userSockets.emit('message', message);
  })

  // Listen for this client to disconnect and remove from user list
  userSocket.on('disconnect', function () {
    console.log("User client has disconnected " + userSocket.id);
    chatRoom.removeUser(userSocket.id)
  })
})


let adminSockets = io.of('/admin')
// Listen for individual clients to connect and add them to user list
adminSockets.on('connection', function (adminSocket) {

  console.log("We have a new admin client: " + adminSocket.id);

  adminSocket.on('status-request', function () {
    adminSocket.emit('status-response', chatRoom.getStatus());
  })

  // Listen for this client to disconnect and remove from user list
  adminSocket.on('disconnect', function () {
    console.log("Admin client has disconnected " + adminSocket.id);
    chatRoom.removeUser(adminSocket.id)
  })
})
