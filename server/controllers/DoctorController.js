var knex = require('../connect.js');
var commonFunction =  require('../function.js');

module.exports = {
	postList: function(req, res){
		var postData = req.body.data;

		knex
		.column(
			'doctor_id', 
			'NAME',
			'DOB', 
			'Email',
			'Phone',
			'Creation_date'
		)
		.select()
		.from('doctors')
		.orderBy('Creation_date', postData.Creation_date)
		.limit(postData.limit)
		.offset(postData.offset)
		.then(function(rows){
			res.json({data: rows});
		})
		.catch(function(error){
			commonFunction.commonError(error, 'ERR_SYS_003', res);
		})
	},//end post list

	postById: function(req, res){
		var postData = req.body.data;

		knex
		.column('*')
		.select()
		.from('doctors')
		.where('doctor_id', postData.doctor_id)
		.then(function(rows){
			res.json({data: rows[0]});
		})
		.catch(function(error){
			commonFunction.commonError(error, 'ERR_SYS_003', res);
		})
	}
}