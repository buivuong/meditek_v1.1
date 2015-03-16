var knex = require('../connect.js');
var bcrypt = require('bcrypt-nodejs');
var commonFunction =  require('../function.js');
var jwt = require('jsonwebtoken');

module.exports = {
	//LOGIN
	postLogin: function(req, res){
		var postData = req.body.data;

		/* CHECK USERNAME */
		knex.select('id', 'user_name', 'password')
			.from('users')
			.where({
				user_name: postData.user_name
			})
			.then(function(rows){
				if(!rows.length){
					commonFunction.commonError(null, 'ERR_SYS_004', res);
					return;
				}

				var compareResult = bcrypt.compareSync(postData.password, rows[0].password);
				if(!compareResult){
					commonFunction.commonError(null, 'ERR_SYS_005', res);
					return;
				}else{
					var user = {
						id: rows[0].id,
						user_name: postData.user_name,
						token: jwt.sign(rows[0], 'meditek')
					}
					return res.json({code: 'MESS_SYS_001', user: user});
				}
			})
			.catch(function(error){
				commonFunction.commonError(error, 'ERR_SYS_003', res);
			})
		/* END CHECK USERNAME */
	}
	//END LOGIN
}