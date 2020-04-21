const mongoose = require('mongoose') ;
const valid = require('validator') ;
const bc = require('bcryptjs') ;
const jwt = require('jsonwebtoken') ;

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true, 
		required: true,
	},
	username: {
		type: String,
		trim: true,
		unique: true,
		required: true,
		validate(username) {
			if(!valid.isAlphanumeric(username) && !valid.contains(username, '.'))
				throw new Error('Invalid Username') ;
		}
	},
	email: {
		type: String,
		trim: true,
		unique: true,
		required: true,
		lowercase: true,
		validate(email) {
			if(!valid.isEmail(email))
				throw new Error('Invalid E-Mail Address') ;
		}
	},
	mobile: {
		type: String,
		trim: true,
		validate(mobile) {
			if(!valid.isNumeric(mobile))
				throw new Error('Invalid Mobile Number') ;
			else if (mobile.length < 10 || mobile.length > 14)
				throw new Error('Mobile Number Length incorrect') ;
		}
	},
	password : {
		type: String,
		trim: true,
		required: true,
		minlength: 6,
		validate(password) {
			if( password.includes('password') || password.includes('123'))
				throw new Error('This password may be too common try some other')
		}
	},
	tokens: [{
		token: {
			type: String, 
			required: true 
		}
	}],
	chats: [String],
	friends: [String],
	pending: [String],
	blocked: [String],
	received: [String],
	notif: [{	}] ,
	dob: {  } ,
	settings : { } ,
	interest: {
		type: String,
		trim: true,
	},
	hobbies : {
		type: String,
		trim: true,
	},
	image: {
		type: String,
		trim: true,
		default: 'https://raw.githubusercontent.com/manan999/images/master/wp/cs_s.jpg'
	}
}, { 
	timestamps: true
}) ;

UserSchema.statics.findByEmail = async function(email, password){
	const user = await User.findOne( {email} )
	// Same as
	// User.findOne( {email: email})
	if(!user)
		throw new Error("User with this Email does not exist") ;
	else
	{
		const isMatch = bc.compareSync(password, user.password) ;
		if(!isMatch)
			throw new Error("Password does not match") ;
		else
			return user ;
	}
}

UserSchema.statics.findByUserName = async function(username){
	const users = await User.find({ username: new RegExp(username, 'ig') }, 'name username image' );

	if(users.length <= 0)
		throw new Error("User with this UserName does not exist") ;
	else
		return users ;
}

UserSchema.statics.findByName = async function(name){
	const users = await User.find({ name: new RegExp(name, 'ig') }, 'name username image' );

	if(users.length <= 0)
		throw new Error("User with this Name does not exist") ;
	else
		return users ;
}

UserSchema.methods.generateAuthToken = function(){
	const token = jwt.sign({_id: this._id.toString()}, process.env.JWT_SECRET) ;
	this.tokens = this.tokens.concat({ token }) ;
	this.save() ;
	return token ;
}

//Comment this method while debugging
UserSchema.methods.toJSON = function(){
	let obj = this.toObject() ;

	delete obj.password ;
	delete obj.tokens ;
	delete obj.uploads ;
	delete obj.__v ;

	return obj ;
}

const User = mongoose.model('User', UserSchema) ;

module.exports = User ;

// chats: [{
// 		chat: {
// 			type: String, 
// 			required: true 
// 		}
// 	}],