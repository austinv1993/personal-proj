var express = require('express')
,	cors = require('cors')
,	mongoose = require('mongoose')
,	bodyParser = require('body-parser')
,	port = 3000
,	mongooseUri = "mongodb://localhost:27017/irrigation-motor-control"
,	UserCtrl = require('./controllers/userCtrl.js')
,	passport = require('passport')
,	flash = require('connect-flash')
,	morgan = require('morgan')
,	cookieParser = require('cookie-parser')
,	session = require('express-session')
// ,	configDB = require('./config/database.js')
,	app = express()

//mongoose.connect("mongodb://username:password@ds031903.mongolab.com:31903/example");
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ 
	secret: 'anythingbutwhatwasalreadyherelololol',
	saveUninitialized: true,
	resave: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());
//require('./routes.js')(app, passport);

//USER//
app.post('/api/user', UserCtrl.addUser);
app.get('/api/userByUsername', UserCtrl.getUser)
app.delete('/api/user', UserCtrl.deleteUser);







app.listen(port, function() {
	console.log("Listening on port:", port);
});
mongoose.connect(mongooseUri);
// mongoose.connection.once('open', function() {
// 	console.log("Connected to MongoDB at:", mongooseUri);
// });