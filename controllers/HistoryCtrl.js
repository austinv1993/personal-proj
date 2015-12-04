var History = require('../models/History.js')

module.exports = {
	addHistory: function(req, res) {
		new History(req.body).save(function(err, valve) {
			if (err) {
				res.send(err);
			} else {
				res.send(valve);
			}
		});
	},
	updateHistory: function(req, res) {
		// console.log('you hit me');
		History.findByIdAndUpdate(req.query.historyId, {$push: {settings: req.body}}, function(err, result){
			if(err) res.status(500).send(err);
			else{
				res.send(result);
			}
		});
	},
	updateHistoryTwo: function(req, res) {
		History.where('userId', req.query.userId).update({$push: {settings: req.body}}, function(err, result) {
			if(err) res.status(500).send(err);
			else{
				res.send(result);
			}
		});	
	},
	getHistory: function(req, res) {
		History.find({}, function(err, valves) {
			if (err) res.send(err);
			else res.send(valves)
		});
	},
	getUserHistory: function(req, res) {
		History.findOne({user: req.query.userId}, function(err, userHist) {
			if (err) res.send(err);
			else res.send(userHist);
		});
	}
}