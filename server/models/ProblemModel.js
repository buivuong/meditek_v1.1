var model = {

	errors: {

		create: {

			required: [
				{field: 'From_date', code: 'ERR_PROBLEM_001'},
				{field: 'To_date', code: 'ERR_PROBLEM_002'},
				{field: 'ICD10_code', code: 'ERR_PROBLEM_003'},
				{field: 'ICPC_code', code: 'ERR_PROBLEM_004'}
			],
			date:[
				{field: 'From_date', code: 'ERR_PROBLEM_005'},
				{field: 'To_date', code: 'ERR_PROBLEM_006'}
			],
			compareDate:[
				{field: 'From_date', code: 'ERR_PROBLEM_007'},
				{field: 'To_date', code: 'ERR_PROBLEM_008'}
			]	
		}

	}

}
module.exports = model;