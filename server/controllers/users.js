var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function(app) {
	return {
		getAllUsers: function(request, response){
			
			User.find({}, function(err, data){
				if(err)
				{
					console.log("error", err);
				}
				else
				{
					console.log(data);
					response.json(data);
				}
			})
		}
	}
})();
