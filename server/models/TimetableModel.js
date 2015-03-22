var model = {
	errors: {
		create: {
			required: [
				{field: 'SERVICE_ID', code: 'ERR_TIMETABLE_001'},
				{field: 'day_of_Week', code: 'ERR_TIMETABLE_002'},
				{field: 'from_time', code: 'ERR_TIMETABLE_003'},
				{field: 'to_time', code: 'ERR_TIMETABLE_004'},
				{field: 'from_date', code: 'ERR_TIMETABLE_009'},
				{field: 'to_date', code: 'ERR_TIMETABLE_010'}
			],
			time: [
				{field: 'from_time', code: 'ERR_TIMETABLE_005'},
				{field: 'to_time', code: 'ERR_TIMETABLE_006'}
			],
			date: [
				{field: 'from_date', code: 'ERR_TIMETABLE_011' },
				{field: 'to_date', code: 'ERR_TIMETABLE_012'}
			],
			compareTime: [
				{field: 'from_time', code: 'ERR_TIMETABLE_007' },
				{field: 'to_time', code: 'ERR_TIMETABLE_008'}
			],
			compareDate: [
				{field: 'from_date', code: 'ERR_TIMETABLE_013' },
				{field: 'to_date', code: 'ERR_TIMETABLE_014'}
			]
		},
		site: {
			required: [
				{field: 'week_ord_of_month', code: 'ERR_TIMETABLE_015'},
				{field: 'site_id', code: 'ERR_TIMETABLE_016'}
			],
			sameWeek: [
				{field: 'week_ord_of_month', code: 'ERR_TIMETABLE_017'}
			]
		}
	}
}

module.exports = model;