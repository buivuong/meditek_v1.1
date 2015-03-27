var knex = require('../connect.js');
var commonFunction =  require('../function.js');
var TimetableModel = require('../models/TimetableModel.js');
var _ = require('lodash');
var moment = require('moment');
var S = require('string');

module.exports = {
	postOne: function(req, res){
		var postData = req.body.data;

		knex
		.column('*')
		.select()
		.from('sys_permernant_calendar_df')
		.where('cal_header_df_id', postData.cal_header_df_id)
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
	},
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
			'from_date',
			'to_date',
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
			_.forEach(TimetableModel.errors.create.time, function(field_error){
				if(field_error.field === field && !commonFunction.checkTime(value)){
					errors.push(field_error);
					return;
				}
			})
			_.forEach(TimetableModel.errors.create.date, function(field_error){
				if(field_error.field === field && !_.isDate(new Date(value))){
					errors.push(field_error);
					return;
				}
			})
		})

		/* FROM TIME, TO TIME NOT LARGER, SMALLER */
		if(postData.from_time && postData.to_time){
			var postFromTime = commonFunction.convertToSeconds(postData.from_time);
			var postToTime = commonFunction.convertToSeconds(postData.to_time);

			if(postFromTime > postToTime){
				errors.push(TimetableModel.errors.create.compareTime[0]);
				errors.push(TimetableModel.errors.create.compareTime[1]);
			}
		}
		/* END FROM TIME, TO TIME NOT LARGER, SMALLER */

		/* FROM DATE, TO DATE NOT LARGER, SMALLER */
		if(postData.from_date && postData.to_date){
			if(!moment(postData.from_date).isBefore(moment(postData.to_date))){
				errors.push(TimetableModel.errors.create.compareDate[0]);
				errors.push(TimetableModel.errors.create.compareDate[1]);
			}
		}
		/* END FROM DATE, TO DATE NOT LARGER, SMALLER */

		if(errors.length > 0){
			res.status(500).json({errors: errors});
			return;
		}

		knex('sys_permernant_calendar_df')
		.insert(postData)
		.then(function(created){
			res.json({data: created[0]});
		})
		.catch(function(error){
			commonFunction.commonError(error, 'ERR_SYS_003', res);
		})
	},//end post add

	postUpdate: function(req, res){
		var postData = req.body.data;

		var errors = [];

		_.forIn(postData, function(value, field){
			_.forEach(TimetableModel.errors.create.required, function(field_error){
				if(field_error.field === field && S(value).isEmpty()){
					errors.push(field_error);
					return;
				}
			})
			_.forEach(TimetableModel.errors.create.time, function(field_error){
				if(field_error.field === field && !commonFunction.checkTime(value)){
					errors.push(field_error);
					return;
				}
			})
			_.forEach(TimetableModel.errors.create.date, function(field_error){
				if(field_error.field === field && !_.isDate(new Date(value))){
					errors.push(field_error);
					return;
				}
			})
		})

		/* FROM TIME, TO TIME NOT LARGER, SMALLER */
		if(postData.from_time && postData.to_time){
			var postFromTime = commonFunction.convertToSeconds(postData.from_time);
			var postToTime = commonFunction.convertToSeconds(postData.to_time);

			if(postFromTime > postToTime){
				errors.push(TimetableModel.errors.create.compareTime[0]);
				errors.push(TimetableModel.errors.create.compareTime[1]);
			}
		}
		/* END FROM TIME, TO TIME NOT LARGER, SMALLER */

		/* FROM DATE, TO DATE NOT LARGER, SMALLER */
		if(postData.from_date && postData.to_date){
			if(!moment(postData.from_date).isBefore(moment(postData.to_date))){
				errors.push(TimetableModel.errors.create.compareDate[0]);
				errors.push(TimetableModel.errors.create.compareDate[1]);
			}
		}
		/* END FROM DATE, TO DATE NOT LARGER, SMALLER */

		if(errors.length > 0){
			res.status(500).json({errors: errors});
			return;
		}

		knex('sys_permernant_calendar_df')
		.where('cal_header_df_id', postData.cal_header_df_id)
		.update(postData)
		.then(function(updated){
			res.json({data: postData.cal_header_df_id});
		})
		.catch(function(error){
			commonFunction.commonError(error, 'ERR_SYS_003', res);
		})
	},//end post edit

	postRemove: function(req, res){
		var postData = req.body.data;

		knex('sys_cal_sites_df')
		.where({
			cal_header_df_id: postData.cal_header_df_id,
			doctor_id: postData.doctor_id
		})
		.del()
		.then(function(deleted){
			knex('sys_permernant_calendar_df')
			.where('cal_header_df_id', postData.cal_header_df_id)
			.del()
			.then(function(deleted){
				res.json({data: deleted});
			})
			.catch(function(error){
				commonFunction.commonError(error, 'ERR_SYS_003', res);
			})
		})
		.catch(function(error){
			commonFunction.commonError(error, 'ERR_SYS_003', res);
		})
	},

	postCreateTimetable: function(req, res){
		var postData = req.body.data;

		if(postData.site.length === 0){
			res.status(500).json({code: 'ERR_TIMETABLE_018'});
			return;
		}

		var weekEnd = 7;

		var dowFromDate = moment(postData.from_date).days();
		var diffFromDateToSunday = weekEnd - dowFromDate;
		var diffFromDateToToDay = moment(postData.to_date).diff(moment(postData.from_date), 'days');

		var dateArrayFromDayToDate = [];

		//GET FIRST WEEK
		if(diffFromDateToSunday < diffFromDateToToDay){
			for(var i = 0; i <= diffFromDateToSunday; i++){
				var current_date = moment(postData.from_date).add(i, 'day').format('YYYY-MM-DD');

				var site_id = 0;
				_.forEach(postData.site, function(site){
					if(site.week_ord_of_month === 1)
						site_id = site.site_id;
				})

				if(moment(current_date).days() === postData.day_of_Week_code){
					var from_time_seconds = commonFunction.addInterval(postData.from_time, 0);
					var to_time_seconds = commonFunction.addInterval(postData.to_time, 0);

					while(from_time_seconds < to_time_seconds){
						var from_time_hhmm = commonFunction.toHHMM(from_time_seconds);
						var from_add_time_seconds = commonFunction.addInterval(from_time_hhmm, postData.Appt_interval);
						var to_time_hhmm = commonFunction.toHHMM(from_add_time_seconds);					

						var object = {CURRENT_DATE: current_date, DOCTOR_ID: postData.doctor_id, SITE_ID: site_id, 
									FROM_TIME: from_time_hhmm, TO_TIME: to_time_hhmm, SERVICE_ID: postData.service_id,
									CLINICAL_DEPT_ID: postData.clinical_dept_id};
						dateArrayFromDayToDate.push(object);

						from_time_seconds = from_time_seconds + postData.Appt_interval*60;
					}
				}//end if
			}

			var current_site = 2;
			var diff_day = 0;

			for(var i = weekEnd; i <= diffFromDateToToDay; i++){
				var current_date = moment(postData.from_date).add(i, 'day').format('YYYY-MM-DD');

				var site_id = 0;

				var temp_site = current_site;
				while(!site_id){
					_.forEach(postData.site, function(site){
						if(site.week_ord_of_month === temp_site){
							site_id = site.site_id;
							return;
						}
					})

					if(!site_id){
						if(temp_site === 4) temp_site = 2;
						else if(temp_site === 3) temp_site = 1;
						else temp_site--;
					}
				}

				if(moment(current_date).days() === postData.day_of_Week_code){
					var from_time_seconds = commonFunction.addInterval(postData.from_time, 0);
					var to_time_seconds = commonFunction.addInterval(postData.to_time, 0);

					while(from_time_seconds < to_time_seconds){
						var from_time_hhmm = commonFunction.toHHMM(from_time_seconds);
						var from_add_time_seconds = commonFunction.addInterval(from_time_hhmm, postData.Appt_interval);
						var to_time_hhmm = commonFunction.toHHMM(from_add_time_seconds);					

						var object = {CURRENT_DATE: current_date, DOCTOR_ID: postData.doctor_id, SITE_ID: site_id, 
									FROM_TIME: from_time_hhmm, TO_TIME: to_time_hhmm, SERVICE_ID: postData.service_id,
									CLINICAL_DEPT_ID: postData.clinical_dept_id};
						dateArrayFromDayToDate.push(object);

						from_time_seconds = from_time_seconds + postData.Appt_interval*60;
					}
				}//end if

				if(diff_day === 6){
					diff_day = -1;
					current_site++;
				}

				diff_day++;

				if(current_site === 5) current_site = 1;
			}

		}else{
			for(var i = 0; i <= diffFromDateToToDay; i++){
				var current_date = moment(postData.from_date).add(i, 'day').format('YYYY-MM-DD');

				var site_id = 0;
				_.forEach(postData.site, function(site){
					if(site.week_ord_of_month === 1)
						site_id = site.site_id;
				})

				if(moment(current_date).days() === postData.day_of_Week_code){
					var from_time_seconds = commonFunction.addInterval(postData.from_time, 0);
					var to_time_seconds = commonFunction.addInterval(postData.to_time, 0);

					while(from_time_seconds < to_time_seconds){
						var from_time_hhmm = commonFunction.toHHMM(from_time_seconds);
						var from_add_time_seconds = commonFunction.addInterval(from_time_hhmm, postData.Appt_interval);
						var to_time_hhmm = commonFunction.toHHMM(from_add_time_seconds);					

						var object = {CURRENT_DATE: current_date, DOCTOR_ID: postData.doctor_id, SITE_ID: site_id, 
									FROM_TIME: from_time_hhmm, TO_TIME: to_time_hhmm, SERVICE_ID: postData.service_id,
									CLINICAL_DEPT_ID: postData.clinical_dept_id};
						dateArrayFromDayToDate.push(object);

						from_time_seconds = from_time_seconds + postData.Appt_interval*60;
					}
				}//end if
			}
		}
		//END GET FIRST WEEK

		if(dateArrayFromDayToDate.length > 0){
			knex('cln_appointment_calendar')
			.insert(dateArrayFromDayToDate)
			.then(function(created){
				res.json({data: postData.cal_header_df_id});
			})
			.catch(function(error){
				commonFunction.commonError(error, 'ERR_SYS_003', res);
			})
		}else{
			res.json({data: null});
		}

	},

	/* SITE */
	postSiteOne: function(req, res){
		var postData = req.body.data;

		knex
		.column('*')
		.select()
		.from('sys_cal_sites_df')
		.where('id', postData.id)
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
	},

	postSiteRemove: function(req, res){
		var postData = req.body.data;

		knex('sys_cal_sites_df')
		.where('id', postData.id)
		.del()
		.then(function(deleted){
			res.json({data: deleted});
		})
		.catch(function(error){
			commonFunction.commonError(error, 'ERR_SYS_003', res);
		})
	},

	postSiteList: function(req, res){
		var postData = req.body.data;

		knex
		.column(
			'sys_cal_sites_df.id',
			'cal_header_df_id',
			'week_ord_of_month',
			'site_id',
			'Site_name'
		)
		.select()
		.from('sys_cal_sites_df')
		.innerJoin('redimedsites', 'sys_cal_sites_df.site_id', 'redimedsites.id')
		.where({
			doctor_id: postData.doctor_id,
			isenable: 1
		})
		.orderBy('week_ord_of_month', 'asc')
		.then(function(rows){
			res.json({data: rows});
		})
		.catch(function(error){
			commonFunction.commonError(error, 'ERR_SYS_003', res);
		})
	},

	postSiteAdd: function(req, res){
		var postData = req.body.data;

		var errors = [];

		_.forIn(postData, function(value, field){
			_.forEach(TimetableModel.errors.site.required, function(field_error){
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

		knex
		.column(
			'id'
		)
		.select()
		.from('sys_cal_sites_df')
		.where({
			doctor_id: postData.doctor_id,
			cal_header_df_id: postData.cal_header_df_id,
			week_ord_of_month: postData.week_ord_of_month
		})
		.then(function(response){
			if(response.length > 0){
				errors.push(TimetableModel.errors.site.sameWeek[0]);
				if(errors.length > 0){
					res.status(500).json({errors: errors});
					return;
				}
			}else{
				knex('sys_cal_sites_df')
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

	postSiteUpdate: function(req, res){
		var postData = req.body.data;

		var errors = [];

		_.forIn(postData, function(value, field){
			_.forEach(TimetableModel.errors.site.required, function(field_error){
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

		knex('sys_cal_sites_df')
		.update(postData)
		.where('id', postData.id)
		.then(function(updated){
			res.json({data: postData.id});
		})
		.catch(function(error){
			commonFunction.commonError(error, 'ERR_SYS_003', res);
		})
	}
	/* END SITE */
}