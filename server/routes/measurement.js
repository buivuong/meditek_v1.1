var MeasurementController = require('../controllers/MeasurementController');

var commonFunction = require('../function.js');

module.exports = function(app){
	var config = require('../config.js');
	var module = config.defaultUrl+'measurement/';

	app.post(module+'list', commonFunction.ensureAuthorized, MeasurementController.postList);
	app.post(module+'add', commonFunction.ensureAuthorized, MeasurementController.postAdd);
	app.post(module+'remove', commonFunction.ensureAuthorized, MeasurementController.postRemove);
	app.post(module+'byId', commonFunction.ensureAuthorized, MeasurementController.postByid);
	app.post(module+'edit', commonFunction.ensureAuthorized, MeasurementController.postEdit);
}