var knex = require('../connect.js');
var commonFunction =  require('../function.js');

module.exports = {
	getListAll: function(req, res){
		knex
		.column('*')
		.select()
		.from('cln_clinical_depts')
		.then(function(rows){
			res.json({data: rows});
		})
		.catch(function(error){
			commonFunction.commonError(error, 'ERR_SYS_003', res);
		})
	}
}