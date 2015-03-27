var AppointmentController = require('../controllers/AppointmentController');

var commonFunction = require('../function.js');

module.exports = function(app){
	var config = require('../config.js');
	var module = config.defaultUrl+'appointment/';

	app.post(module+'byDoctor', commonFunction.ensureAuthorized, AppointmentController.postByDoctor);
	app.post(module+'load', commonFunction.ensureAuthorized, AppointmentController.postLoad);
}