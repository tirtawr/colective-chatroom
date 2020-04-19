const shuffleArray = require('./shuffleArray.js')

class ChatRoom {
  constructor() {
    // NOTE: 12 users will be involved, while the rest will watch
    // There should be exactly 12 names and 6 pairs of room numbers,
    // otherwise shit will hit the fan
    this.availableNames = ['Kitty', 'Birdy', 'Whaley', 'Puppy', 'Calfy', 'Piglet', 'Crocky', 'Goosey', 'Koala', 'Otter', 'Parrot', 'Rabbit'];
    this.availableRoomNumbers = [1,1,2,2,3,3,4,4,5,5,6,6];
    shuffleArray(this.availableNames);
    shuffleArray(this.availableRoomNumbers);
    this.users = {};
  }

  // Adds a new user to the chatroom, if it is full,
  // they will be assigned an audience role
  addUser(userId) {
    if (this.availableNames.length > 0 && this.availableRoomNumbers.length > 0) {
      this.users[userId] = {
        role: 'USER',
        name: this._getAvailableName(),
        roomNumber: this._getAvailableRoomNumber()
      };
      return this.users[userId];
    }
    return {
      role: 'AUDIENCE',
      name: 'Audience',
      roomNumber: -1
    };
  }

  // Removes a user from the chatroom
  removeUser(userId) {
    if(this.users[userId]) {
      this._returnName(this.users[userId].name);
      this._returnRoomNumber(this.users[userId].roomNumber);
      delete this.users[userId];
    }
  }

  // Fetch an available name, if none are available, returns -1
  _getAvailableName() {
    if(this.availableNames.length > 0) {
      return this.availableNames.shift();
    } else {
      return -1;
    }
  }

  // Put back a name into the queue
  _returnName(name) {
    this.availableNames.push(name);
  }

  // Fetch an available name, if none are available, returns -1
  _getAvailableRoomNumber() {
    if (this.availableRoomNumbers.length > 0) {
      return this.availableRoomNumbers.shift();
    } else {
      return -1;
    }
  }

  // Put back a room number into the queue
  _returnRoomNumber(roomNumber) {
    this.availableRoomNumbers.push(roomNumber);
  }
}

module.exports = ChatRoom
