var mongoose = require('mongoose');

var Valve = new mongoose.Schema({
	valveName: {type: String, required: true}
,	relativeLocation: String
,	timeOpen: {type: Date, required: true}
,	timeClose: {type: Date, required: true}
,	user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User' }
,	status: {type: String, default: 'Pending'}
,	valveNum: Number
})

module.exports = mongoose.model('Valve', Valve)