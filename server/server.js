const express = require('express');
const bodyParser = require('body-parser');
var mongoose = require('./database/mongoose');
var cors = require('cors');

const app = express()
app.use(cors());

const server = require('http').createServer(app);
const chats = require('./chat/chat.route');
const chatsSocket = require('./chat/chat.socket');


const userRoute = require('./user/userRoutes'); // Imports routes for the products


var port = process.env.PORT || 4242;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", 'http://localhost:3000'); //<--
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header("Access-Control-Allow-Headers",
//         'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json,Authorization');
//     next();
// });
app.get('/', (req, res) => res.send('Hello World with Express'));

app.use('/api/user/', userRoute);
app.use('/api/chats', chats);
//app.listen(port, () => console.log('Server running on port 4242!'))
// Socket.io configs
const options = { /* ... */ };

const io = require('socket.io')(server//, { origins: "*" }
);
io.on('connection', socket => {
    chatsSocket.init(socket)

})
server.listen(port, () => console.log('Server running on port 4242!'))

