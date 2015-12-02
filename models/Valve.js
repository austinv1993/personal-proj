var mongoose = require('mongoose');

var Valve = new mongoose.Schema({
	valveName: {type: String, required: true}
,	relativeLocation: String
,	dateOperate: {type: Date, required: true}
,	timeOpen: {type: String, required: true}
,	timeClose: {type: String, required: true}
// ,	userId: {type: String, required: true}
})

module.exports = mongoose.model('Valve', Valve)