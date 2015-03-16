var knex = require('../connect.js');
var commonFunction =  require('../function.js');

module.exports = {
	postList: function(req, res){
		var postData = req.body.data;

		knex
		.column(
			'doctor_id', 
			knex.raw('IFNULL(NAME,"") AS NAME'), 
			'DOB', 
			knex.raw('IFNULL(Email,"") AS Email'), 
			knex.raw('IFNULL(Phone,"") AS Phone'), 
			'Creation_date'
		)
		.select()
		.from('doctors')
		.where(knex.raw('IFNULL(NAME,"") LIKE "%'+postData.NAME+'%"'))
		.where(knex.raw('IFNULL(Email,"") LIKE "%'+postData.Email+'%"'))
		.where(knex.raw('IFNULL(Phone,"") LIKE "%'+postData.Phone+'%"'))
		.orderBy('Creation_date', postData.Creation_date)
		.limit(postData.limit)
		.offset(postData.offset)
		.then(function(rows){
			knex('doctors').count('doctor_id as a')
			.then(function(a){
				res.json({data: rows, count: a[0].a});
			})
			.catch(function(error){
				commonFunction.commonError(error, 'ERR_SYS_003', res);
			})
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