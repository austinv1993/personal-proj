var User = require('../models/User.js')

module.exports = {
	addUser: function(req, res) {
		new User(req.body).save(function(err, user) {
			if (err) {
				res.send(err);
			} else {
				res.send(user);
			}
		})
	}
,	getUsers: function(req, res) {
		User.find({}).exec(function(err, user) {
			res.send(user);
		})
	}
,	getUser: function(req, res) {
		var username = req.query.username;
		console.log(username);
		User.findOne({name: username}, function(err, user) {
			if (err) {
				console.log(err);
				res.send(err);
			} else {
				console.log(user);
				res.send(user);
			}
		})
}

,	updateUser: function(req, res) {
		User.findById(req.query.id, function(err, user) {
			if (err) {
				res.send(err);
			} else {
				user.title = req.body.title;
				user.date = req.body.date;
				user.tasks = req.body.tasks;
				user.save(function(err, project) {
					if(err) {
						res.send(err);
					} else {
						res.send(project);
					}
				})
				
			}
		})
	}
,	deleteUser: function(req, res) {
		User.findByIdAndRemove(req.query.id, function(err, result) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(result);
			}
		})
	}
}