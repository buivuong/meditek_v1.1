var knex = require('../connect.js');
var bcrypt = require('bcrypt-nodejs');
var commonFunction =  require('../function.js');
var jwt = require('jsonwebtoken');

module.exports = {
	//LOGIN
	postLogin: function(req, res){
		var postData = req.body.data;

		/* CHECK USERNAME */
		knex.select('user_name', 'password')
			.from('users')
			.where({
				user_name: postData.user_name
			})
			.then(function(rows){
				if(!rows.length){
					commonFunction.commonError(null, 'ERR_SYS_004', res);
					return;
				}
				bcrypt.compare(postData.password, rows[0].password, function(err, compareResult){
					if(!compareResult){
						commonFunction.commonError(null, 'ERR_SYS_005', res);
						return;
					}else{
						var user = {
							user_name: postData.user_name,
							token: jwt.sign(rows[0], 'meditek')
						}
						return res.json({code: 'MESS_SYS_001', user: user});
					}
				})
			})
			.catch(function(error){
				commonFunction.commonError(error, 'ERR_SYS_003', res);
			})
		/* END CHECK USERNAME */

		//var hash = bcrypt.hashSync('bacon');

		//console.log(hash);

		//knex.select();

		/*knex.select('user_name', 'user_type').from('users').limit(10).reduce(function(memo, row){
			memo.names.push(row.user_name);
			memo.user_types.push(row.user_type);
			memo.count++;
			return memo;
		}, {count: 0, names: [], user_types: []}).then(function(obj){
			res.json({obj: obj});
		})*/

		/*knex.select('user_name').from('users').limit(10).map(function(row){
			return row.user_name;
		})
		.then(function(names){
			res.json({names: names});
		})
		.catch(function(error){
			res.json({error: error});
		})*/

		/*knex.select('user_name').from('users')
		.then(function(rows){
			res.json({rows: rows});
		})*/
	}
	//END LOGIN
}