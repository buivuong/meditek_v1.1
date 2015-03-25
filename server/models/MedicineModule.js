var model = {
	errors:{
		create:{
			required:[
				{field: 'medicine_name', code: 'ERR_MEDICINE_001'},
				{field: 'medicine_price', code: 'ERR_MEDICINE_002'},
				{field: 'medicine_unit', code: 'ERR_MEDICINE_003'}
			]
		}
	}
}

module.exports = model;