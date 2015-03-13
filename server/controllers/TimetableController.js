var knex = require('../connect.js');
var commonFunction =  require('../function.js');

module.exports = {
	postList: function(req, res){
		var postData = req.body.data;

		knex
		.column('*')
		.select()
		.from('sys_permernant_calendar_df')
		.where({
			'doctor_id': postData.doctor_id,
			'isenable': 1
		})
		.then(function(rows){
			res.json({data: rows});
		})
		.catch(function(error){
			commonFunction.commonError(error, 'ERR_SYS_003', res);
		})
	}//end post list
}