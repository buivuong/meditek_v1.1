var model = {
	errors:{
		create:{
			required:[
				{field: 'patient_id', code: 'ERR_MEASUREMENT_001'},
				{field: 'measurement_date', code: 'ERR_MEASUREMENT_002'},
				{field: 'cal_id', code: 'ERR_MEASUREMENT_003'}
			]
		}//end create
	}//end errors
};

module.exports = model;