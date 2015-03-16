var knex = require('../connect.js');
var commonFunction =  require('../function.js');
var TimetableModel = require('../models/TimetableModel.js');
var _ = require('lodash');
var moment = require('moment');

module.exports = {
	postList: function(req, res){
		var postData = req.body.data;

		knex
		.column(
			'cal_header_df_id',
			'doctor_id',
			'sys_permernant_calendar_df.service_id',
			'day_of_Week',
			'from_time',
			'to_time',
			'sys_permernant_calendar_df.isenable',
			'sys_permernant_calendar_df.Creation_date',
			'sys_services.SERVICE_NAME'
		)
		.select()
		.from('sys_permernant_calendar_df')
		.leftOuterJoin('sys_services', 'sys_permernant_calendar_df.SERVICE_ID', 'sys_services.SERVICE_ID')
		.where({
			'doctor_id': postData.doctor_id,
			'sys_services.Isenable': 1,
			'sys_permernant_calendar_df.isenable': 1
		})
		.orderBy('day_of_Week', 'asc')
		.then(function(rows){
			res.json({data: rows});
		})
		.catch(function(error){
			commonFunction.commonError(error, 'ERR_SYS_003', res);
		})
	},//end post list
	postAdd: function(req, res){
		var postData = req.body.data;

		var errors = {
			require: [],
			datetime: []
		};

		_.forIn(postData, function(value, field){
			_.forEach(TimetableModel.errors.create.required, function(field_error){
				if(field_error.field === field && (value === '' || value === null)){
					errors.require.push(field_error);
					return;
				}
			})
			_.forEach(TimetableModel.errors.create.datetime, function(field_error){
				if(field_error.field === field && !moment.isDate(value)){
					errors.datetime.push(field_error);
					return;
				}
			})
		})

		if(errors.require.length > 0 || errors.datetime.length > 0){
			res.status(500).json({errors: errors});
			return;
		}

		/*knex
		.insert(postData)*/
	}
}