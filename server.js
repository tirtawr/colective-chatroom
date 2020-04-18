let port = process.env.PORT || 8000;
let express = require('express');
let app = express();
let server = require('http').createServer(app).listen(port, function () {
  console.log('Server listening at port: ', port);
});

let users = [];
let names = ["user1","user2","user3","user4","user5","user6","user7","user8","user9","user10","user11","user12","user13","user14"];
let rooms = [{},{},{},{},{},{},{}];

// Tell server where to look for files
app.use(express.static('public'));
app.get('/', (req, res) => res.redirect('/user'));

// Create socket connection
let io = require('socket.io').listen(server);

// Listen for individual clients to connect and add them to user list
io.sockets.on('connection', function (socket) {

  console.log("We have a new client: " + socket.id);

  users.push(socket.id);

  name = random(names);
  names = names.filter(d => d !== name);

  let roomNumber;

  for (let i = 0; i < rooms.length; i++) {
    if ('user1' in rooms[i]) {
      if ('user2' in rooms[i]) {
        console.log("Full");
      } else {
        rooms[i].user2 = name;
        roomNumber = i+1;
        break;
      }
    } else {
      rooms[i].user1 = name;
      roomNumber = i+1;
      break;
    }
  }

  // TODO:
  // this will be filled with a generated username for the user,
  // room number, and list of prompts to choose
  socket.emit('setCredentials', {
    name: name,
    roomNumber: roomNumber,
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
  //  {
  //    text: message.text,
  //    roomNumber: message.roomNumber,
  //    senderName: message.senderName
  //  }
    io.sockets.emit('message', message);
  })

  // Listen for this client to disconnect and remove from user list
  // also have to remove these people from the rooms, right?
  //i guess associate the socket id with the name and then
  //when they leave scan each room for the socket id associated with the name
  //emit a remove message so they get removed from rooms
  socket.on('disconnect', function () {
    console.log("Client has disconnected " + socket.id);
    users = users.filter(d => d !== socket.id)
  })
})
