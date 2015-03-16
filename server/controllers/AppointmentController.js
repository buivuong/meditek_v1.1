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
	}
}