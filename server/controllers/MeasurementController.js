var knex = require('../connect.js');
var commonFunction =  require('../function.js');
var MeasurementModel = require('../models/MeasurementModel.js');
var _ = require('lodash');
var S = require('string');

module.exports = {
	
	postList: function(req, res){
	  var postData = req.body.data;
	  knex
	  .column(
	  		   'cln_patients.First_name', 
	  		   knex.raw('IFNULL(cln_patients.First_name,"") AS First_name'),
	  		   'cln_patients.Sur_name',
	  			'cln_patient_measurements.patient_id',
	  			'cln_patient_measurements.measure_id',
	  			'cln_patient_measurements.measurement_date', 
	  			'cln_patient_measurements.Creation_date'
	  		)
	  .from('cln_patient_measurements')
	  .innerJoin('cln_patients', 'cln_patient_measurements.Patient_id', 'cln_patients.Patient_id')
	  .where(knex.raw('IFNULL(First_name,"") LIKE "%'+postData.First_name+'%"'))
	  .then(function(rows){
	   knex('cln_patient_measurements').count('cln_patient_measurements.measure_id as a')
	  	//.where(knex.raw('IFNULL(First_name,"") LIKE "%'+postData.First_name+'%"'))
	   .then(function(a){
	    	res.json({data: rows,count: a[0].a });
	   })
	   .catch(function(error){
	    commonFunction.commonFunction(error, 'ERR_SYS_003', res);
	   })
	  })
	  .catch(function(error){
	   commonFunction.commonFunction(error, 'ERR_SYS_003', res);
	  })

	 },
	postAdd: function(req, res){
		var postData = req.body.data;

		var errors = [];
		
		_.forIn(postData, function(value, field){
			_.forEach(MeasurementModel.errors.create.required, function(field_error){
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

		knex('cln_patient_measurements')
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
		 .column('cln_patient_measurements.*','cln_patients.First_name','cln_patients.Sur_name')
		.from('cln_patient_measurements')
		.innerJoin('cln_patients', 'cln_patient_measurements.Patient_id', 'cln_patients.Patient_id')
		.where('measure_id', postData.measure_id)
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
	postRemove: function(req, res){
		var postData = req.body.data;
		knex('cln_patient_measurements')
		.where({
			measure_id: postData})
		.del()
		.then(function(deleted){
			res.json({data: postData.id});
		})
		.catch(function(error){
			commonFunction.commonError(error, 'ERR_SYS_003', res);
		})
	},
	postEdit: function(req,res){
		var postData = req.body.data;
		var id = postData.measure_id;
		var errors = [];
		console.log(postData);
		if(errors.length > 0){
			res.status(500).json({errors: errors});
			return;
		}
		// EDIT OPERATION
		knex('cln_patient_measurements')
		.where({
			measure_id:id
		})
		.update(postData)
		.then(function(updated){
			res.json({data: id});
		})
		.catch(function(error){
			commonFunction.commonError(error, 'ERR_SYS_003', res);
		})
	}

}