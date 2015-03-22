var knex = require('../connect.js');
var commonFunction =  require('../function.js');
var AllergieModel = require('../models/AllergieModel.js');
var _ = require('lodash');
var moment = require('moment');
var S = require('string');

module.exports = {
	postList:function(req,res){
		var postData = req.body.data;

		knex
		.select()
		.from('cln_allergies')
		.where(knex.raw('IFNULL(allergie_name,"") LIKE "%'+postData.allergie_name+'%"'))
		.orderBy('Creation_date', postData.Creation_date)
		.limit(postData.limit)
		.offset(postData.offset)
		.then(function(rows){
			knex('cln_allergies').count('allergie_id as a')
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
	},

	postAdd: function(req,res){
		var postData = req.body.data;

		console.log('this is postData', postData);
		var errors = [];

		_.forIn(postData,function(value,field){
			_.forEach(AllergieModel.errors.create.required, function(field_error){
				if(field_error.field === field && S(value).isEmpty()){
					errors.push(field_error);
					return;
				}
			})
		});

		if(errors.length > 0){
			res.status(500).json({errors: errors});
			return;
		}

		// INSERT OPERATION
		knex('cln_allergies')
		.insert(postData)
		.then(function(result){
			res.json({status:'success'});
		})
		.catch(function(error){
			commonFunction.commonError(error, 'ERR_SYS_003', res);
		})
	},

	postById: function(req,res){
		var postData = req.body.data;

		knex
		.select()
		.column('allergie_id', 'allergie_name', 'isEnable')
		.from('cln_allergies')
		.where({
			'allergie_id': postData.allergie_id
		})
		.then(function(rows){
			if(!rows.length){
				commonFunction.commonError(null, 'ERR_SYS_006', res);
				return;
			}

			var data = rows[0];
			res.json({data: data});
		})
		.catch(function(error){
			commonFunction.commonError(error, 'ERR_SYS_003', res);
		})
	},

	postEdit: function(req,res){
		var postData = req.body.data;
		var id = postData.allergie_id;

		delete postData.allergie_id;

		var errors = [];

		_.forIn(postData,function(value,field){
			_.forEach(AllergieModel.errors.create.required, function(field_error){
				if(field_error.field === field && S(value).isEmpty()){
					errors.push(field_error);
					return;
				}
			})
		});

		if(errors.length > 0){
			res.status(500).json({errors: errors});
			return;
		}

		// EDIT OPERATION
		knex('cln_allergies')
		.where({
			allergie_id:id
		})
		.update(postData)
		.then(function(result){
			res.json({status:'success'});
		})
		.catch(function(error){
			commonFunction.commonError(error, 'ERR_SYS_003', res);
		})
	}
}