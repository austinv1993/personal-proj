var History = require('../models/History.js')

module.exports = {
	addHistory: function(req, res) {
		new History(req.body).save(function(err, valve) {
			if (err) {
				res.send(err);
			} else {
				res.send(valve);
			}
		})
	},
	updateHistory: function(req, res) {
	
		History.findById(req.params.userId, function(err, result){
			if(err) return res.status(500).send(err);
			else{
				result.settings.push(req.query.productId);
				console.log(result.settings);
				result.save(function(){
					History.findById(req.params.userId).populate('settings')
					.exec(function(err, user){
						res.status(200).send(user.cart);
​
					})
				});
			}
		})
	}
	}
}