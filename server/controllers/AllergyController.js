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
			'allergy_name',
			'Creation_date'
		)
		.select()
		.from('cln_allergies')
		.orderBy('Creation_date', postData.Creation_date)
		.limit(postData.limit)
		.offset(postData.offset)
		.then(function(rows){
			res.json({data: rows});
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
	},

	postAllergyPatient : function(req, res){
		var postData = req.body.data;
		knex
		.select('*')
		.from('cln_patient_allergies')
		.where({allergy_id: postData.allergy_id,patient_id: postData.patient_id})
		.then(function(response){
			if(response.length > 0){
				commonFunction.commonError(null, 'ERR_ALLERGY_002', res);
				return;
			}else{
				knex('cln_patient_allergies')
				.insert(postData)
				.then(function(created){
					res.json({data: created[0]});
				})
				.catch(function(error){
					commonFunction.commonError(error, 'ERR_SYS_003', res);
				})
			}
		})
		.catch(function(error){
			commonFunction.commonError(error, 'ERR_SYS_003', res);
		})
	},

	postRemoveAllergyPatient : function (req,res){
		var postData = req.body.data;
		knex('cln_patient_allergies')
		.where({
			allergy_id: postData.allergy_id,
			patient_id: postData.patient_id
		})
		.del()
		.then(function(deleted){
			res.json({data: postData.id});
		})
		.catch(function(error){
			commonFunction.commonError(error, 'ERR_SYS_003', res);
		})
	}
}