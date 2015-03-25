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
	},//end postAdd

	postByid: function(req, res){
		var postData = req.body.data;
		knex
		.column('*')
		.select()
		.from('cln_allergies')
		.where('allergy_id', postData.allergy_id)
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
	},//end byId

	postIdAllergy: function(req, res){
		var postData = req.body.data;

		//var arg = '1'
		console.log('this is postData',postData);
		var IdAllergy = knex
		.select('patient_id')
		.from('cln_patient_allergies')
		.where('allergy_id', postData.allergy_id);

		IdAllergy
		.then(function(result){
			if(!result || result.length===0){
				res.json({data: [], count: 0});
			}
			knex
			.select('*')
			.from('cln_patients')
			.whereIn('cln_patients.patient_id', IdAllergy)
			.then(function(rows){
				//arg = 2;
				res.json({data: rows, count: rows.length})
			})
			.catch(function(error){
				commonFunction.commonError(error, 'ERR_SYS_003', res);
			})
		})
		.catch(function(error){
			commonFunction.commonError(error, 'ERR_SYS_003', res);
		})

		},//end postIdAllergy

	postEdit: function(req,res){
		var postData = req.body.data;
		var id = postData.allergy_id;
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

		// EDIT OPERATION
		knex('cln_allergies')
		.where({
			allergy_id:id
		})
		.update(postData)
		.then(function(updated){
			res.json({data: id});
		})
		.catch(function(error){
			commonFunction.commonError(error, 'ERR_SYS_003', res);
		})
	},//end postEdit

	postRemove: function(req, res){
		var postData = req.body.data;
		knex('cln_allergies')
		.where({
			allergy_id: postData})
		.del()
		.then(function(deleted){
			res.json({data: postData.id});
		})
		.catch(function(error){
			commonFunction.commonError(error, 'ERR_SYS_003', res);
		})
	}
}