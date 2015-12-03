var Valve = require('../models/Valve.js')

module.exports = {
	addValve: function(req, res) {
		new Valve(req.body).save(function(err, valve) {
			if (err) {
				res.send(err);
			} else {
				res.send(valve);
			}
		})
	}
,	getValves: function(req, res) {
		Valve.find({userId: req.query.userId}, function(err, valves) {
			if (err) res.send(err);
			else res.send(valves)
		})
	}
,	getValve: function(req, res) {
		
		Valve.findById(req.query.valveId, function(err, valve) {
			if (err) {
				console.log(err);
				res.send(err);
			} else {
				console.log(valve);
				res.send(valve);
			}
		})
}

,	updateValve: function(req, res) {
		Valve.findById(req.query.id, function(err, valve) {
			if (err) {
				res.send(err);
			} else {
				valve.title = req.body.title;
				valve.date = req.body.date;
				valve.tasks = req.body.tasks;
				valve.save(function(err, project) {
					if(err) {
						res.send(err);
					} else {
						res.send(project);
					}
				})
				
			}
		})
	}
,	deleteValve: function(req, res) {
		Valve.findByIdAndRemove(req.query.id, function(err, result) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(result);
			}
		})
	}
}