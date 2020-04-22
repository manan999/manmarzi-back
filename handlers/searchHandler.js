const exp = require('express') ;

const User = require('../models/User.js') ;
const auth = require('../src/auth.js') ;

const router = new exp.Router() ;

checkTypeFilter = (type, filter, q) => {
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
	const {q, filter, type} = req.query ;
	console.log(req.user.name+' is searching for '+type+' '+filter+' containing '+ q) ;

	let user = {} ;

	checkTypeFilter(type, filter, q)
	.then(data => {
		if(data.length > 0)
			res.json(data)
		else
			throw new Error('No Search Results Found') ;
	})
	.catch(err => res.status(404).json('No Search Results') ) ;
	
}) ;

module.exports = router ;