var express = require('express')
,	cors = require('cors')
,	mongoose = require('mongoose')
,	bodyParser = require('body-parser')
,	port = 3000
,	mongooseUri = "mongodb://localhost:27017/irrigation-motor-control"
,	UserCtrl = require('./controllers/userCtrl.js')
,	passport = require('passport')
,	session = require('express-session')
,	GoogleStrategy = require('passport-google-oauth').OAuth2Strategy 
,	app = express()

passport.use(new GoogleStrategy({
	clientId: '889788685119-svv9ao951coi5cbpn1c7theh86gvpj48.apps.googleusercontent.com',
	clientSecret: 'yCRIVEI4TtpPWjsqbJjg1jZx',
	callbackURL: 'http://localhost:3000/auth/google/callback',
	function(req, accessToken, refreshToken, profile, done){
		done(null, profile)
	}
}));


app.use(bodyParser.json());
app.use(cors())
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));



app.use(session({ 
	secret: 'anythingbutwhatwasalreadyherelololol',
	saveUninitialized: true,
	resave: true
}));
app.use(passport.initialize());
app.use(passport.session()); 
passport.serializeUser(function(user, done) {
	done(null, user);
})

passport.deserializeUser(function(user, done) {
	done(null, user);
})

//USER//
app.post('/api/user', UserCtrl.addUser);
app.get('/api/userByUsername', UserCtrl.getUser)
app.delete('/api/user', UserCtrl.deleteUser);







app.listen(port, function() {
	console.log("Listening on port:", port);
});
mongoose.connect(mongooseUri);
mongoose.connection.once('open', function() {
	console.log("Connected to MongoDB at:", mongooseUri);
});