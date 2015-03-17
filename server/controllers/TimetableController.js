var knex = require('../connect.js');
var commonFunction =  require('../function.js');
var TimetableModel = require('../models/TimetableModel.js');
var _ = require('lodash');
var moment = require('moment');
var S = require('string');

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

		var errors = [];

		_.forIn(postData, function(value, field){
			_.forEach(TimetableModel.errors.create.required, function(field_error){
				if(field_error.field === field && S(value).isEmpty()){
					errors.push(field_error);
					return;
				}
			})
			_.forEach(TimetableModel.errors.create.datetime, function(field_error){
				if(field_error.field === field && !commonFunction.checkDatetime(value)){
					errors.push(field_error);
					return;
				}
			})
		})

		if(postData.from_time && postData.to_time){
			var postFromTime = commonFunction.convertToSeconds(postData.from_time);
			var postToTime = commonFunction.convertToSeconds(postData.to_time);

			if(postFromTime > postToTime){
				errors.push(TimetableModel.errors.create.compareTime[0]);
				errors.push(TimetableModel.errors.create.compareTime[1]);
			}
		}

		if(errors.length > 0){
			res.status(500).json({errors: errors});
			return;
		}

		/* CHECK BETWEEN FROM TIME AND TO TIME */
		knex
		.column('*')
		.select()
		.from('sys_permernant_calendar_df')
		.where({
			doctor_id: postData.doctor_id,
			day_of_Week: postData.day_of_Week
		})
		.then(function(rows){
			if(rows){
				_.forEach(rows, function(row){
					var getFromTime = commonFunction.convertToSeconds(moment(row.from_time).format('YYYY-MM-DD HH:mm').toString());
					var getToTime = commonFunction.convertToSeconds(moment(row.to_time).format('YYYY-MM-DD HH:mm').toString());
					
					if(postData.from_time && postData.to_time){
						var postFromTime = commonFunction.convertToSeconds(postData.from_time);
						var postToTime = commonFunction.convertToSeconds(postData.to_time);

						if(commonFunction.checkBetweenTimes(postFromTime, {from_time: getFromTime, to_time: getToTime})){
							errors.push(TimetableModel.errors.create.existsTime[0]);
						}

						if(commonFunction.checkBetweenTimes(postToTime, {from_time: getFromTime, to_time: getToTime})){
							errors.push(TimetableModel.errors.create.existsTime[1]);
						}
					}//end if postData
				})

				if(errors.length > 0){
					res.status(500).json({errors: errors});
					return;
				}
			}
		})
		.catch(function(error){
			commonFunction.commonError(error, 'ERR_SYS_003', res);
		})
		/* END CHECK BETWEEN FROM TIME AND TO TIME */

		knex.add
	}
}