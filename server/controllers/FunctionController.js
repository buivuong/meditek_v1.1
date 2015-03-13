var knex = require('../connect.js');
var commonFunction =  require('../function.js');

module.exports = {
	listWithMenu: function(req, res){
		var postData = req.body.data;

		knex.select('redi_menus.menu_id', 'redi_menus.description', 'redi_menus.parent_id', 'redi_menus.function_id', 'redi_functions.definition')
		.from('redi_user_menus')
		.innerJoin('redi_menus', 'redi_user_menus.menu_id', 'redi_menus.menu_id')
		.leftOuterJoin('redi_functions', 'redi_menus.function_id', 'redi_functions.function_id')
		.where({
			'redi_user_menus.user_id': postData.user_id,
			'redi_user_menus.isEnable': 1,
			'redi_menus.isEnable': 1,
			'redi_menus.isWeb': 1,
			'redi_menus.isMobile': 0
		})
		.then(function(rows){
			res.json({data: rows});
		})
		.catch(function(error){
			commonFunction.commonError(error, 'ERR_SYS_003', res);
		})
	}//end listWithMenu

}