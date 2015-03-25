var MedicineController = require('../controllers/MedicineController');

var commonFunction = require('../function.js');

module.exports = function(app){
	var config = require('../config.js');
	var module = config.defaultUrl+'medicine/';

	app.post(module+'list', commonFunction.ensureAuthorized, MedicineController.postList);
	app.post(module+'add', commonFunction.ensureAuthorized, MedicineController.postAdd);
	app.post(module+'byid', commonFunction.ensureAuthorized, MedicineController.postById);
	app.post(module+'edit', commonFunction.ensureAuthorized, MedicineController.postEdit);
	app.post(module+'remove', commonFunction.ensureAuthorized, MedicineController.postRemove);

}