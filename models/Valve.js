var mongoose = require('mongoose');

var Valve = new mongoose.Schema({
	valveName: {type: String, required: true}
,	relativeLocation: String
,	timeOpen: {type: Date, required: true}
,	timeClose: {type: Date, required: true}
,	userId: {type: String, required: true}
})

module.exports = mongoose.model('Valve', Valve)