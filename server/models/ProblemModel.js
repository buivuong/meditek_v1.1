var model = {

	errors: {

		create: {
			
			required: [

				{field: 'Patient_id', code: 'ERR_PROBLEM_001'},
				{field: 'From_date', code: 'ERR_PROBLEM_002'},
				{field: 'To_date', code: 'ERR_PROBLEM_003'},
				{field: 'ICD10_code', code: 'ERR_PROBLEM_004'},
				{field: 'ICPC_code', code: 'ERR_PROBLEM_005'}

			],
			date: [
				{field: 'From_date', code: 'ERR_PROBLEM_006'},
				{field: 'To_date', code: 'ERR_PROBLEM_007'}
			],
			compareDate: [
				{field: 'From_date', code: 'ERR_PROBLEM_008'},
				{field: 'To_date', code: 'ERR_PROBLEM_009'}
			]

		}//end create

	}//end errors

};
module.exports = model;