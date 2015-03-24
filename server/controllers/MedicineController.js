var knex = require('../connect.js');
var commonFunction =  require('../function.js');
var MedicineModule = require('../models/MedicineModule.js');
var _ = require('lodash');
var moment = require('moment');
var S = require('string');

module.exports = {
	postList: function(req,res){
		var postData = req.body.data;

		knex
		.select()
		.from('cln_medicines')
		.where(knex.raw('IFNULL(medicine_name,"") LIKE "%'+postData.medicine_name+'%"'))
		.orderBy('Creation_date', postData.Creation_date)
		.limit(postData.limit)
		.offset(postData.offset)
		.then(function(rows){
			knex('cln_medicines').count('medicine_id as a')
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
			_.forEach(MedicineModule.errors.create.required, function(field_error){
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
		knex('cln_medicines')
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
		.column('medicine_id', 'medicine_name', 'medicine_price', 'medicine_unit')
		.from('cln_medicines')
		.where({
			'medicine_id': postData.medicine_id
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
		var id = postData.medicine_id;

		delete postData.medicine_id;

		var errors = [];

		_.forIn(postData,function(value,field){
			_.forEach(MedicineModule.errors.create.required, function(field_error){
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
		knex('cln_medicines')
		.where({
			medicine_id:id
		})
		.update(postData)
		.then(function(result){
			res.json({status:'success'});
		})
		.catch(function(error){
			commonFunction.commonError(error, 'ERR_SYS_003', res);
		})
	},

	postRemove: function(req, res){
		var postData = req.body.data;
		knex('cln_medicines')
		.where({
			medicine_id: postData})
		.del()
		.then(function(deleted){
			res.json({data: postData.id});
		})
		.catch(function(error){
			commonFunction.commonError(error, 'ERR_SYS_003', res);
		})
	}
}