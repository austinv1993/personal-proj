var Valve = require('../models/Valve.js');
var History = require('../models/History.js');
var schedule = require('node-schedule');
// var http = require('http');
var needle = require('needle');

module.exports = {
	addValve: function(req, res) {
		new Valve(req.body).save(function(err, valve) {
			var thisValve = req.body;
			if (err) {
				res.send(err);
			} else {
				var dateOn = new Date(req.body.timeOpen);
				schedule.scheduleJob(dateOn, function() {
					console.log(dateOn);
					console.log(thisValve);
					needle
						.post('http://' + req.query.ip, {valveID: thisValve._id, valveDrive: 'open'}, { multipart: true }, function(err, resp, body) {
							if (err) {
								console.log(err);
							} else {
								if(resp) console.log(resp);
								console.log(body);
							}
						})
						.on('end', function() {
							console.log('Ready-o, friend-o.');
						})
				})
				var dateOff = new Date(req.body.timeClose);
				schedule.scheduleJob(dateOff, function() {
					console.log(dateOff);
					needle
						.post('http://' + req.query.ip, {valveID: thisValve._id, valveDrive: 'close'}, { multipart: true }, function(err, resp, body) {
							if (err) console.log(err);
							else {
								if (resp) console.log(resp);
								console.log(body);
							}
						})
						.on('end', function() {
							console.log('Ready-o, friend-o.');
						})
				})
				res.send(valve);
			}
		})
	}
,	getValves: function(req, res) {
		Valve.find({user_id: req.query.userId}, function(err, valves) {
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
		Valve.findByIdAndUpdate(req.query.id, req.body, function(err, result) {
			if (err) {
				res.status(500).send(err);
			} else {
				Valve.findById(result._id, function(err, valve) {
					if (err) res.status(500).send(err);
					else {
						var dateOn = new Date(valve.timeOpen);
						schedule.scheduleJob(dateOn, function() {
							console.log(dateOn);
							// console.log(thisValve);
							needle
								.post('http://' + req.query.ip, {valveID: valve._id, valveDrive: 'open'}, { multipart: true }, function(err, resp, body) {
									if (err) {
										console.log(err);
									} else {
										if(resp) console.log(resp);
										console.log(body);
									}
								})
						})
						var dateOff = new Date(valve.timeClose);
						schedule.scheduleJob(dateOff, function() {
							console.log(dateOff);
							needle
								.post('http://' + req.query.ip, {valveID: valve._id, valveDrive: 'close'}, { multipart: true }, function(err, resp, body) {
									if (err) console.log(err);
									else {
										if (resp) console.log(resp);
										console.log(body);
									}
								})
						})
						res.send(valve);
					}
				})
			}
		})
	},
	updateValveStatus: function(req, res) {
		Valve.findOneAndUpdate({user_id: req.body.user_id, valveNum: req.body.valveNum}, {$set: {status: req.body.status}}, function(err, result) {
			if (err) res.status(500).send(err);
			else {
				console.log(result);
				Valve.findById(result._id, function(err, valve) {
					if(err) res.status(500).send(err);
					else {
						console.log(valve);
						History.findOneAndUpdate({user: valve.user_id}, {$push: {settings: valve}}, function(err, response) {
							if(err) res.status(500).send(err);
							else {
								res.send(response);
							}
						})
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
};