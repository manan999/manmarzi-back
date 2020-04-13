const sg = require('@sendgrid/mail') ;

sg.setApiKey(process.env.API_KEY) ;

const sendWelcomeMail = (name, email) => {
	sg.send({
		to: email,
		from: 'noreply@manmarzi.web.app',
		subject: 'Welcome to Manmarzi App!',
		text: `Hello ${name}, Welcome to "Manmarzi : Chat Games with Friends"
		I hope you like this App. Enjoy your time!`
	}) ;
}

const sendGoodbyeMail = (name, email) => {
	sg.send({
		to: email,
		from: 'noreply@manmarzi.web.app',
		subject: 'Sorry to see you go!',
		text: `Hello ${name}, Sorry to hear that you are deleting your account with us.
				We are sorry we could not meet the expectations you had. Please give us your valuable
				feedback so that we can improve upon the user experience.`
	}) ;
}

module.exports = {
	sendWelcomeMail, sendGoodbyeMail 
}