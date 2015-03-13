var DoctorController = require('../controllers/DoctorController');

var commonFunction = require('../function.js');

module.exports = function(app){
	var config = require('../config.js');
	var module = config.defaultUrl+'doctor/';

	app.post(module+'list', commonFunction.ensureAuthorized, DoctorController.postList);
}