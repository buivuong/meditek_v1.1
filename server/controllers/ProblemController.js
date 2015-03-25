var knex = require('../connect.js');
var commonFunction =  require('../function.js');
var ProblemModel = require('../models/ProblemModel.js');
var _ = require('lodash');
var moment = require('moment');
var S = require('string');

module.exports = {
	
	postList: function(req, res){
		var postData = req.body.data;

		knex
		.select('*')
		.from('cln_problems')
		.where(knex.raw('IFNULL(ICD10_code,"") LIKE "%'+postData.ICD10_code+'%"'))
		.where(knex.raw('IFNULL(ICPC_code,"") LIKE "%'+postData.ICPC_code+'%"'))
		.orderBy('Creation_date', postData.Creation_date)
		.limit(postData.limit)
		.offset(postData.offset)
		.then(function(rows){
			knex('cln_problems').count('Problem_id as a')
			.then(function(a){
				res.json({data: rows, count:a[0].a});
			})//end then
			.catch(function(error){
				commonFunction.commonError(error, 'ERR_SYS_003', res);
			})//end catch
		})//end then
		.catch(function(error){
			commonFunction.commonError(error, 'ERR_SYS_003', res);	
		})//end then
	},//end postList

	postAdd: function(req, res){
		var postData = req.body.data;

		var errors = [];

		_.forIn(postData, function(value, field){
			_.forEach(ProblemModel.errors.create.required, function(field_error){
				if(field_error.field === field && S(value).isEmpty()){
					errors.push(field_error);
					return;
				}
			})
		})	

		if(errors.length > 0){
			res.status(500).json({errors:errors});
			return;
		}

		knex('cln_problems')
		.insert(postData)
		.then(function(created){
			res.json({data: created[0]});
		})
		.catch(function(error){
			commonFunction.commonError(error, 'ERR_SYS_003', res);
		})
	},//end postAdd

	postByid: function(req, res){

		var postData = req.body.data;

		knex
		.select()
		.from('cln_problems')
		.where('Problem_id', postData.Problem_id)
		.then(function(rows){
			if(rows.length>0)
				res.json({data: rows[0]});
			else{
				commonFunction.commonFunction(error, 'ERR_SYS_006', res);
				return;
			}
		})
		.catch(function(error){
			commonFunction.commonFunction(error, 'ERR_SYS_003', res);
		})
	},

	postRemove: function(req, res){

		var postData = req.body.data;
		console.log("this is postData", postData);
		knex('cln_problems')
		.where({Problem_id: postData})
		.del()
		.then(function(deleted){
			res.json({data: postData.id});
		})
		.catch(function(error){
			commonFunction.commonFunction(error, 'ERR_SYS_003', res);
		})
	}
}