var mongoose = require('mongoose');

var Valve = new mongoose.Schema({
	relativeLocation: String
,	name: String
,	open: {type: String, required: true}
,	close: {type: String, required: true}
})