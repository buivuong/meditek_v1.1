var knex = require('../connect.js');
var commonFunction =  require('../function.js');

module.exports = {
	postByDoctor: function(req, res){
		var postData = req.body.data;

		knex
		.column('FROM_TIME', 'TO_TIME')
		.select()
		.from('cln_appointment_calendar')
		.where({
			DOCTOR_ID: postData.doctor_id
		})
		.then(function(rows){
			if(!rows.length){
				commonFunction.commonError(null, 'ERR_SYS_006', res);
				return;
			}

			var data = {
				FROM_TIME: rows[0].FROM_TIME,
				TO_TIME: rows[rows.length-1].TO_TIME
			}
			res.json({data: data});
		})
		.catch(function(error){
			commonFunction.commonError(error, 'ERR_SYS_003', res);
		})
	},

	postLoad: function(req, res){
		var postData = req.body.data;

		if(!postData.clinical_dept_id) postData.clinical_dept_id = '';

		knex
		.column(
			'cln_appointment_calendar.FROM_TIME',
			'cln_appointment_calendar.TO_TIME',
			'cln_appointment_calendar.SERVICE_ID',
			'cln_appointment_calendar.DOCTOR_ID',
			'cln_appointment_calendar.CAL_ID',
			'cln_appointment_calendar.Patient_id'
		)
		.leftOuterJoin('cln_appt_patients', 'cln_appointment_calendar.CAL_ID', 'cln_appt_patients.CAL_ID')
		.from('cln_appointment_calendar')
		.where({
			'cln_appointment_calendar.CURRENT_DATE': postData.datepicker,
			'cln_appointment_calendar.SITE_ID': postData.site_id
		})
		.where('cln_appointment_calendar.CLINICAL_DEPT_ID', 'like', '%'+postData.clinical_dept_id+'%')
		.then(function(rows){
			knex
			.distinct(
				'cln_appointment_calendar.DOCTOR_ID',
				'doctors.NAME'
			)
			.select()
			.from('cln_appointment_calendar')
			.innerJoin('doctors', 'cln_appointment_calendar.DOCTOR_ID', 'doctors.doctor_id')
			.where({
				'cln_appointment_calendar.CURRENT_DATE': postData.datepicker,
				'cln_appointment_calendar.SITE_ID': postData.site_id
			})
			.orderBy('cln_appointment_calendar.DOCTOR_ID', 'asc')
			.then(function(doctors){
				res.json({data: rows, doctors: doctors});
			})
			.catch(function(error){
				commonFunction.commonError(error, 'ERR_SYS_003', res);
			})
		})
		.catch(function(error){
			commonFunction.commonError(error, 'ERR_SYS_003', res);
		})	

	}
}