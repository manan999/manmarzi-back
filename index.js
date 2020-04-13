const exp = require('express') ;
const cors = require('cors') ;
const http = require('http') ;
const socketio = require('socket.io') ;
const Filter = require('bad-words') ;

const bw = require('./bw.js') ;
require('./src/connect.js') ;
const userHandler = require('./handlers/userHandler.js') ;
const loginHandler = require('./handlers/loginHandler.js') ;
const imageHandler = require('./handlers/imageHandler.js') ;

const app = exp() ;
const server = http.createServer(app) ;
const io = socketio(server)

app.use(exp.json()) ;
app.use(cors()) ;

let msgs = [] ;

const filter = new Filter() ;
filter.addWords(...bw) ;

app.use(userHandler) ;
app.use(loginHandler) ;
app.use(imageHandler) ;

// io.on('connection', socket => {
// 	console.log('Connected to Web Socket');

// 	socket.emit('ping', {msgs} ) ;

// 	socket.on('message', data => {		
// 		msgs = [...msgs, filter.clean(data.msg)] ;
// 		io.emit('ping', {msgs} ) ;
// 	})
// })

app.get('/', (req, res) => {
	console.log(req.body) ;
	console.log(req.headers) ;
	console.log(req.params) ;
	console.log(req.url) ;
	res.json("Please give the required endpoint for json data") ;
}) ;

server.listen(process.env.PORT, () => {
	console.log("Server is Online" ) ;
}) ;
