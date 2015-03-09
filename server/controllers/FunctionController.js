var knex = require('../connect.js');
var commonFunction =  require('../function.js');

module.exports = {
	listWithMenu: function(req, res){
		knex.select('*').from('redi_functions')
		.leftJoin('redi_menus', 'redi_functions.function_id', 'redi_menus.function_id')
		.then(function(rows){
			res.json({rows: rows});
		})
	}//end listWithMenu

}