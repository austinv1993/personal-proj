var mongoose = require('mongoose');

var History = new mongoose.Schema({
	valveName: {type: String, required: true}
,	timeOpen: {type: Date, required: true}
,	timeClose: {type: Date, required: true}
,	userId: {type: String, required: true}
,	status: {type: String, default: 'Pending'}	
})

module.exports = mongoose.model('History', History)