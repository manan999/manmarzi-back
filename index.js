const exp = require('express') ;
const http = require('http') ;
const socketio = require('socket.io') ;
const Filter = require('bad-words') ;

const bw = require('./bw.js') ;
// require('./src/Mongoose.js') ;

const app = exp() ;
const server = http.createServer(app) ;
const io = socketio(server)

app.use(exp.json()) ;

let msgs = [] ;

const filter = new Filter() ;
filter.addWords(...bw) ;

io.on('connection', socket => {
	console.log('Connected to Web Socket');

	socket.emit('ping', {msgs} ) ;

	socket.on('message', data => {		
		msgs = [...msgs, filter.clean(data.msg)] ;
		io.emit('ping', {msgs} ) ;
	})
})

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
