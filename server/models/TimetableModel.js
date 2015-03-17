var model = {
	errors: {
		create: {
			required: [
				{field: 'SERVICE_ID', code: 'ERR_TIMETABLE_001'},
				{field: 'day_of_Week', code: 'ERR_TIMETABLE_002'},
				{field: 'from_time', code: 'ERR_TIMETABLE_003'},
				{field: 'to_time', code: 'ERR_TIMETABLE_004'}
			],
			datetime: [
				{field: 'from_time', code: 'ERR_TIMETABLE_005'},
				{field: 'to_time', code: 'ERR_TIMETABLE_006'}
			],
			compareTime: [
				{field: 'from_time', code: 'ERR_TIMETABLE_009'},
				{field: 'to_time', code: 'ERR_TIMETABLE_010'}	
			],
			existsTime: [
				{field: 'from_time', code: 'ERR_TIMETABLE_007'},
				{field: 'to_time', code: 'ERR_TIMETABLE_008'}
			]
		}
	}
}

module.exports = model;