var express = require('express')
,	cors = require('cors')
,	mongoose = require('mongoose')
,	bodyParser = require('body-parser')
,	port = 3000
,	secret = require('./js/secret.js')
,	mongooseUri = "mongodb://localhost:27017/irrigation-motor-control"
// ,	mongooseUri = secret.mongooseUri
,	UserCtrl = require('./controllers/UserCtrl.js')
,	ValveCtrl = require('./controllers/ValveCtrl.js')
,	HistoryCtrl = require('./controllers/HistoryCtrl.js')
,	History = require('./models/History.js')
,	NSCtrl = require('./controllers/NSCtrl.js')
,	passport = require('passport')
,	session = require('express-session')
,	GoogleStrategy = require('passport-google-oauth').OAuth2Strategy 
,	auth = require('./routes/auth.js')
,	User = require('./models/User.js')
,	router = require('./routes/users.js')
,	schedule = require('node-schedule')
,	twilioSecret = require('./js/twilioSecret.js')
,	needle = require('needle')
,	client = require('twilio')(twilioSecret.clientId, twilioSecret.clientAuth)	
,	app = express();
// ,	rest = require('arest')(app);

passport.use(new GoogleStrategy({
	clientID: secret.clientID,
	clientSecret: secret.clientSecret,
	callbackURL: 'http://localhost:3000/auth/google/callback'
},
	function(req, accessToken, refreshToken, profile, done){
		var query = { 'google.id': profile.id };

           User.findOne(query, function (error, user) {

               if (user) {
                //    console.log('Google user found in database: ', user);
                   done(null, user);
               }
               else {
                   console.log('Google user not found in database');
                   user = new User;
                   user.email = profile.emails[0].value;
                   user.image = profile._json.image.url;
                   user.displayName = profile.displayName;
                   user.google = {};
                   user.google.id = profile.id;
                   user.google.token = accessToken;

                //    console.log('new user created: ', user);
                   user.save().then(function(response) {
					//    console.log('this is the response from user.save()', response)
					   new History({user: response._id}).save(function(err, result) {
						   if (err) console.log(err);
						   else {
							   console.log('History successfuly created for', response.displayName);
						   }
					   })
				   })
                   done(null, user);
               }
           });
	
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

app.route('/auth/google/callback')
	.get(passport.authenticate('google', {
		// successRedirect: 'http://107.170.234.129:3000/#/valves',
		successRedirect: '/#/valves',
		failureRedirect: '/error'
	}));

app.route('/auth/google')
	.get(passport.authenticate('google', {
		scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
	}));
//ARDUINO//
// rest.addDevice('http','192.168.1.103'); //NEED TO PUT IN CORRECT IP ADDRESS


//USER//
app.post('/api/user', UserCtrl.addUser);
app.get('/api/userByUsername', UserCtrl.getUser);
app.delete('/api/user', UserCtrl.deleteUser);
app.get('/api/user/authenticated', function(req, res) {
	console.log(req.user);
	res.send(req.user);
});
app.put('/api/user/update', UserCtrl.updateUserWithValveId);
//VALVES//
app.post('/api/valve', ValveCtrl.addValve);
app.get('/api/valves', ValveCtrl.getValves);
app.get('/api/valve', ValveCtrl.getValve);
app.put('/api/valves', ValveCtrl.updateValve);
app.put('/api/valves/status', ValveCtrl.updateValveStatus);

//AUTH//
app.get('/api/user/authenticated', function(req, res) {
	if(req.user) res.send(req.user);
	else console.log('There is not authenticated user');
})
//HISTORY//
app.post('/api/history', HistoryCtrl.addHistory);
app.put('/api/history', HistoryCtrl.updateHistory);
app.get('/api/history', HistoryCtrl.getHistory);
app.get('/api/history/user', HistoryCtrl.getUserHistory);

// client.messages.create({
//     body: "YO WHADUP",
//     to: "+14803107459",
//     from: "+15208660429"
// }, function(err, message) {
//     // process.stdout.write(message.sid);
// 	if(err) console.log(err);
// 	else {
// 		console.log(message);
// 	}
// });
// needle
// 	.post('http://50.160.68.183:3000', {valveNum: 1, valveDrive: 'open'}, { multipart: true }, function(err, resp, body) {
// 	if (err) {
// 	  console.log(err);
// 	} else {
// 	  console.log("no errors");
// 	  if(resp)  {
// 	    console.log(resp);
// 		console.log(body);
// 	  }
// 	}
// })
// 	.on('end', function() {
// 	  console.log('Ready-o, friend-o.');
// 	})







app.listen(port, function() {
	console.log("Listening on port:", port);
});
mongoose.connect(mongooseUri);
mongoose.connection.once('open', function() {
	console.log("Connected to MongoDB at:", mongooseUri);
});