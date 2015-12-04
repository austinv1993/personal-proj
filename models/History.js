var mongoose = require('mongoose');
var Valve = require('./Valve.js');

var History = new mongoose.Schema({
	settings: [Valve]
,	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('History', History)