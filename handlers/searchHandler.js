const exp = require('express') ;

const User = require('../models/User.js') ;
const auth = require('../src/auth.js') ;

const router = new exp.Router() ;

checkTypeFilter = (type, filter) => {
	if(type === 'User')
	{
		if(filter === 'Name')
			return User.findByName(q) ;
		else if(filter === 'UserName')
			return User.findByUserName(q) ;
		else
			throw new Error('invalid filter') ;
	}
	else
		throw new Error('invalid type') ;
}

router.get('/search', auth, (req, res) => {
	const {q, filter, type} = req.params ;
	console.log(req.user.name+' is searching for '+type+' '+filter+' containing '+ q) ;

	let user = {} ;

	checkTypeFilter(type, filter, q)
	// User.findByEmail(email, password)
	// .then(userr => {
	// 	user = userr ;
	// 	return userr.generateAuthToken() ;
	// })
	// .then(token => {
	// 	console.log('user login token generated')
	// 	const obj = {token, user} ;
	// 	res.json(obj); 
	// })
	// .catch(err => res.status(400).json('Incorrect Email Or Password') ) ;
}) ;

module.exports = router ;