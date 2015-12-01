var mongoose = require('mongoose');

var User = new mongoose.Schema({
	name: {type: String, required: true}
,	password: {type: String, required: true}
,	email: {type: String, required: true}
,	dateCreated: {type: Date, default: new Date()}
,	valves: [{type: mongoose.Schema.Types.ObjectId, ref: 'Valve'}]
})

module.exports = mongoose.model('User', User)