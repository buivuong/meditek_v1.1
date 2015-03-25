var ClinicalDeptController = require('../controllers/ClinicalDeptController');

var commonFunction = require('../function.js');

module.exports = function(app){
	var config = require('../config.js');
	var module = config.defaultUrl+'clinicalDept/';

	app.get(module+'listAll', commonFunction.ensureAuthorized, ClinicalDeptController.getListAll);
}