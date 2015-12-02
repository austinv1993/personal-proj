var express = require('express')
,	passport = require('passport')
,	router = express.Router();

router.route('/auth/google/callback')
	.get(passport.authenticate('google', {
		successRedirect: '/users',
		failureRedirect: '/error'
	}));

router.route('/auth/google')
	.get(passport.authenticate('google', {
		scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
	}));
	
module.exports = router;