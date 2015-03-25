var PatientController = require('../controllers/PatientController');

var commonFunction = require('../function.js');

module.exports = function(app){
	var config = require('../config.js');
	var module = config.defaultUrl+'patient/';

	app.post(module+'list', commonFunction.ensureAuthorized, PatientController.postList);
	//app.post(module+'byid', commonFunction.ensureAuthorized, PatientController.postById);
}