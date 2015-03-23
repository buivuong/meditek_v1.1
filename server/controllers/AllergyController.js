var knex = require('../connect.js');
var commonFunction =  require('../function.js');
var AllergyModel = require('../models/AllergyModel.js');
var _ = require('lodash');
var S = require('string');

module.exports = {
	postList: function(req, res){
		var postData = req.body.data;

		knex
		.column(
			'allergy_id', 
			knex.raw('IFNULL(allergy_name,"") AS allergy_name'), 
			'Creation_date'
		)
		.select()
		.from('cln_allergies')
		.where(knex.raw('IFNULL(allergy_name,"") LIKE "%'+postData.allergy_name+'%"'))
		.orderBy('Creation_date', postData.Creation_date)
		.limit(postData.limit)
		.offset(postData.offset)
		.then(function(rows){
			knex('cln_allergies').count('allergy_id as a')
			.where(knex.raw('IFNULL(allergy_name,"") LIKE "%'+postData.allergy_name+'%"'))
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

	postAdd: function(req, res){
		var postData = req.body.data;

		var errors = [];

		_.forIn(postData, function(value, field){
			_.forEach(AllergyModel.errors.create.required, function(field_error){
				if(field_error.field === field && S(value).isEmpty()){
					errors.push(field_error);
					return;
				}
			})
		})

		if(errors.length > 0){
			res.status(500).json({errors: errors});
			return;
		}

		knex('cln_allergies')
		.insert(postData)
		.then(function(created){
			res.json({data: created[0]});
		})
		.catch(function(error){
			commonFunction.commonError(error, 'ERR_SYS_003', res);
		})
	}//end postAdd
}