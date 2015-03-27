var knex = require('../connect.js');
var commonFunction =  require('../function.js');
var _ = require('lodash');
var S = require('string');

module.exports = {
	postList: function(req, res){
		var postData = req.body.data;

		knex
		.column(
			'Patient_id', 
			knex.raw('IFNULL(Title,"") AS Title'),
			knex.raw('IFNULL(First_name,"") AS First_name'),
			knex.raw('IFNULL(Sur_name,"") AS Sur_name'), 
			knex.raw('IFNULL(Middle_name,"") AS Middle_name'), 
			knex.raw('IFNULL(State,"") AS State'), 
			'DOB', 
			'Sex', 
			'Creation_date'
		)
		.select()
		.from('cln_patients')
		.where(knex.raw('IFNULL(First_name,"") LIKE "%'+postData.First_name+'%"'))
		.where(knex.raw('IFNULL(Sur_name,"") LIKE "%'+postData.Sur_name+'%"'))
		.where(knex.raw('IFNULL(Title,"") LIKE "%'+postData.Title+'%"'))
		.where(knex.raw('IFNULL(State,"") LIKE "%'+postData.State+'%"'))
		.where(knex.raw('IFNULL(Sex,"") LIKE "%'+postData.Sex+'%"'))
		.limit(postData.limit)
		.offset(postData.offset)
		.orderBy('Creation_date', postData.Creation_date)
		.orderBy('DOB', postData.DOB)
		.then(function(rows){
			knex('cln_patients').count('Patient_id as a')
			.where(knex.raw('IFNULL(First_name,"") LIKE "%'+postData.First_name+'%"'))
			.where(knex.raw('IFNULL(Sur_name,"") LIKE "%'+postData.Sur_name+'%"'))
			.where(knex.raw('IFNULL(Title,"") LIKE "%'+postData.Title+'%"'))
			.where(knex.raw('IFNULL(State,"") LIKE "%'+postData.State+'%"'))
			.where(knex.raw('IFNULL(Sex,"") LIKE "%'+postData.Sex+'%"'))
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
	},//end postAdd 

	postByid: function(req, res){
		var postData = req.body.data;
		knex
		.column('*')
		.select()
		.from('cln_patients')
		.where('Patient_id', postData.Patient_id)
		.then(function(rows){
			if(rows.length > 0)
				res.json({data: rows[0]});
			else{
				commonFunction.commonFunction(error, 'ERR_SYS_006', res);
				return;
			}
		})
		.catch(function(error){
			commonFunction.commonError(error, 'ERR_SYS_003', res);
		})
	}//end byId



	
}