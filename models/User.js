var mongoose = require('mongoose');

var User = new mongoose.Schema({
	displayName: {type: String, required: true}
,	google: {type: Object}
,	image: {type: String}
,	email: {type: String, required: true}
,	dateCreated: {type: Date, default: new Date()}
,	valves: [{type: mongoose.Schema.Types.ObjectId, ref: 'Valve'}]
})

module.exports = mongoose.model('User', User)