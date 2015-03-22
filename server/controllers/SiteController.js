var knex = require('../connect.js');
var commonFunction =  require('../function.js');

module.exports = {
	postListByDept: function(req, res){
		var postData = req.body.data;

		knex
		.column('redimedsites.id', 'Site_name')
		.select()
		.from('redimedsites')
		.innerJoin('redimedsite_depts', 'redimedsites.id', 'redimedsite_depts.Site_id')
		.where({
			'redimedsite_depts.ISENABLE': 1,
			'redimedsite_depts.CLINICAL_DEPT_ID': postData.clinical_dept_id
		})
		.then(function(rows){
			res.json({data: rows});
		})
		.catch(function(error){
			commonFunction.commonError(error, 'ERR_SYS_003', res);
		})
	}//end post List By Dept
}