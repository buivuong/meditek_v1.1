var knex = require('../connect.js');
var commonFunction =  require('../function.js');

module.exports = {
	postListByDept: function(req, res){
		var postData = req.body.data;

		knex
		.column('sys_services.SERVICE_ID', 'SERVICE_NAME')
		.select()
		.from('sys_services')
		.innerJoin('cln_dept_services', 'sys_services.SERVICE_ID', 'cln_dept_services.SERVICE_ID')
		.where({
			'sys_services.Isenable': 1,
			'cln_dept_services.ISENABLE': 1,
			'cln_dept_services.CLINICAL_DEPT_ID': postData.clinical_dept_id
		})
		.then(function(rows){
			res.json({data: rows});
		})
		.catch(function(error){
			commonFunction.commonError(error, 'ERR_SYS_003', res);
		})
	}//end post List By Dept
}