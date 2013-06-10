var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    controller = require('./controllers/gameController'),
    path = require('path');

var app = express();
app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set("view options", {
    layout: false
  });
  app.set("user", {
    username: null
  });
  app.set('view options', { pretty: true });
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({
    secret: 'xxx',
    cookie  : {
      maxAge  : 3600000
    }
  }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.errorHandler());
});

app.get("/", routes.index);
app.get("/main", routes.main);
app.get('/room', routes.room);
app.post("/", function(req, res){
  req.session.user = {
    username: req.body.username
  };
  res.redirect("/main");
});
app.post("/main", function(req,res){
  req.session.user = null;
  res.redirect("/");
});

var server = http.createServer(app).listen(app.get('port'),
    function(){
    console.log("Serwer nasluchuje na porcie " + app.get('port'));
});

var user = [];
var allRooms = [];

allRooms.push({user: user, "roomName": "0"});
console.log("allRooms push fisrt: " + allRooms);
/*
for(var i=0; i<2; i++){
  allRooms[0].user[i] = null;
}
*/
console.log(allRooms);
var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
  socket.on('join', function(data){
 
    if(allRooms[allRooms.length-1].user.length === 2){
      allRooms.push({
        user : [user[user.length-2], user[user.length-1]],
//      user: user[1], 
        roomName: allRooms.length
      }); 
    }   

    for( var i=0; i<2; i++){
      if(allRooms[allRooms.length-1].user[i] === null){
        allRooms[allRooms.length-1].user[i] = socket.id;
        io.sockets.emit('waitForPLayers', true);
        socket.join(controller.findRoomByPlayer(socket.id, allRooms));
        socket.roomName = controller.findRoomByPlayer(socket.id, allRooms);
/*        
        data.users = allUsers;
        controller.join(io, socket, data);
*/
        console.log('APP :' + socket.roomName);
        break;
      }
    }
    
  });
  
  socket.on('message', function(data){
    controller.message(io,socket,data);
  });
});
