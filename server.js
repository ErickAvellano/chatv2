var express = require('express')
var app = express();

const http = require('http');
const server = require('http').Server(app);
const io = require('socket.io')(server);
// const PORT = process.end.PORT || 8000;

const defURL = "http://localhost:8000/"

app.set("view engine", "ejs");

app.use(express.static('public'));

app.get('/login', function(req, res) {
  res.render('pages/login', {socketURL:defURL});
});

app.get('/usertry', function(req, res) {
  res.render('pages/usertry', {socketURL:defURL});
});
app.post('/login/usertry', function(req, res) {
  // handle the login logic here
  // ...
  // then render the usertry.ejs file
  res.render('usertry','user1', {socketURL:defURL});
});

app.get('/user1', function(req, res) {
    res.render('pages/user1', {socketURL:defURL});
  });

app.get('/user2', function(req, res) {
    res.render('pages/user2', {socketURL:defURL});
  });

app.get('/user3', function(req, res) {
    res.render('pages/user3', {socketURL:defURL});
  }); 

// io.on('connection', (socket) => {
//     console.log('a user connected');
  
//     // handle the message event from the client-side
// socket.on('message', (data) => {
//     console.log(`Message received: ${data.text} at ${data.timestamp}`);
      
//       // TODO: save the message to a database or a file
//   });
//   socket.on('message', (data) => {
//     console.log('message:', data);
//     // Broadcast the message to all connected clients
//     io.emit('message', data);
//   });

// socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (data) => {
    console.log('message received:', data);
    
    // use socket.broadcast instead of io.emit to prevent the sender from receiving their own message
    socket.broadcast.emit('message', data);
    
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
  
server.listen(8000);
console.log("server is listening on port: 8000");

