var express = require('express')
,	cors = require('cors')
,	mongoose = require('mongoose')
,	bodyParser = require('body-parser')
,	port = 3000
,	mongooseUri = "mongodb://localhost:27017/irrigation-motor-control"
,	UserCtrl = require('./controllers/userCtrl.js')
,	app = express()

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));

//USER//
app.post('/api/user', UserCtrl.addUser);
app.get('/api/userByUsername', UserCtrl.getUser)
app.delete('/api/user', UserCtrl.deleteUser);





var a = 4;


app.listen(port, function() {
	console.log("Listening on port:", port);
});
mongoose.connect(mongooseUri);
mongoose.connection.once('open', function() {
	console.log("Connected to MongoDB at:", mongooseUri);
});