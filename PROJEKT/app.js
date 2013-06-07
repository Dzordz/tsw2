var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path');

var app = express();
app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.set('user', {
      username: "Not logged in"
    });
    app.use(express.cookieParser());
    app.use(express.session({
      secret: "xxx",
      cookie: {
        maxAge: 360000
      }
    }));
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get("/", routes.index);
app.get("/main", routes.main);
app.post("/", function(req,res){
  console.log(req.body.username);
  console.log(req.session.user);
  req.session.user.username = req.body.username;
  res.redirect("/main");
});

var server = http.createServer(app).listen(app.get('port'),
    function(){
    console.log("Serwer nasluchuje na porcie " + app.get('port'));
});

var io = require('socket.io').listen(server);
