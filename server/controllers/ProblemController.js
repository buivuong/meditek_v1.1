var knex = require('../connect.js');
var commonFunction =  require('../function.js');
var ProblemModel = require('../models/ProblemModel.js');
var _ = require('lodash');
var moment = require('moment');
var S = require('string');

module.exports = {

	postList: function(req, res){

		var postData = req.body.data;

		console.log(postData);

		knex
		.column('cln_patients.First_name', 
		'cln_patients.Sur_name',
		'cln_problems.Patient_id',
		'cln_problems.Problem_id',
		'cln_problems.Creation_date',
		'cln_problems.From_date',
		'cln_problems.To_date',
		'cln_problems.ICD10_code',
		'cln_problems.ICPC_code')
		.from('cln_problems')
		.innerJoin('cln_patients', 'cln_problems.Patient_id', 'cln_patients.Patient_id')
		.orderBy('cln_problems.Creation_date', postData.Creation_date)
		.limit(postData.limit)
		.offset(postData.offset)
		.then(function(rows){
			res.json({data: rows });
		})
		.catch(function(error){
			commonFunction.commonFunction(error, 'ERR_SYS_003', res);
		})

	},//end postList

	postByid: function(req, res){

		var postData = req.body.data;

		knex
		.column('cln_patients.First_name', 
		'cln_patients.Sur_name',
		'cln_problems.Patient_id',
		'cln_problems.Problem_id',
		'cln_problems.Creation_date',
		'cln_problems.From_date',
		'cln_problems.To_date',
		'cln_problems.ICD10_code',
		'cln_problems.ICPC_code',
		'cln_problems.Notes')
		.from('cln_problems')
		.leftOuterJoin('cln_patients', 'cln_problems.Patient_id', 'cln_patients.Patient_id')
		.where('cln_problems.Problem_id', postData.Problem_id)
		.then(function(rows){
			if(rows.length>0)
				res.json({data: rows[0]});
			else{
				commonFunction.commonFunction(error, 'ERR_SYS_003', res);
				return;
			}
		})
		.catch(function(error){
			commonFunction.commonFunction(error, 'ERR_SYS_003', res);
		})
	},//end Byid

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

		if(errors.length>0){
			res.status(500).json({errors: errors});
			return;
		}

		knex('cln_problems')
		.insert(postData)
		.then(function(created){
			res.json({data: created[0]});
		})
		.catch(function(error){
			commonFunction.commonFunction(error, 'ERR_SYS_003', res);
		})
	},//end postAdd

	postEdit: function(req, res){

		var postData = req.body.data;

		var id = postData.Problem_id;

		var errors = [];

		_.forIn(postData, function(value, field){
			_.forEach(ProblemModel.errors.create.required, function(field_error){
				if(field_error.field === field && S(value).isEmpty()){
					errors.push(field_error);
					return;
				}
			})
		})

		if(errors.length>0){
			res.status(500).json({errors: errors});
			return;
		}

		knex('cln_problems')
		.where({
			Problem_id:id
		})
		.update(postData)
		.then(function(updated){
			res.json({data: id});
		})
		.catch(function(error){
			commonFunction.commonFunction(error, 'ERR_SYS_003', res);
		})
	}, //end postEdit

	postRemove: function(req, res){

		var postData = req.body.data;

		knex('cln_problems')
		.where({
			Problem_id: postData
		})
		.del()
		.then(function(deleted){
			res.json({data: postData.id});
		})
		.catch(function(error){
			commonFunction.commonFunction(error, 'ERR_SYS_003', res);
		})

	}//end postRemove

}