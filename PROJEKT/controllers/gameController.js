exports.join = function(io, socket, data){
/*  data.users.push(data.username);
  data.rooms[0].push(data.username);
  
  if (data.rooms[0].length === 2){
    data.rooms.push(data.rooms.length);
    while(data.rooms[0].length){
      data.rooms[data.rooms.length-1] = data.rooms[0].pop();
    }
  }
*/
  io.on('connection', function(socket){
    io.sockets.emit('usersList', JSON.stringify({
      list: data.users
    }));
  });
};

exports.message = function(io,socket,data){
  io.sockets.emit('message2', JSON.stringify(data));
};


exports.findRoomByPlayer = function(userId, allRooms){
  var roomName = "";

  for(var i=0; i<=allRooms.length-1; i++){
    for(var j=0; j<allRooms[i].user.length; j++){
      if(allRooms[i].user[j] === userId){
        roomName = allRooms[i].roomName;
      }
    }
  }

  return roomName;
}
