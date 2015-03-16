var ServiceController = require('../controllers/ServiceController');

var commonFunction = require('../function.js');

module.exports = function(app){
	var config = require('../config.js');
	var module = config.defaultUrl+'service/';

	app.post(module+'listByDept', commonFunction.ensureAuthorized, ServiceController.postListByDept);
}