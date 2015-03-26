var AllergyController = require('../controllers/AllergyController');

var commonFunction = require('../function.js');

module.exports = function(app){
	var config = require('../config.js');
	var module = config.defaultUrl+'allergy/';

	app.post(module+'list', commonFunction.ensureAuthorized, AllergyController.postList);
	app.post(module+'add', commonFunction.ensureAuthorized, AllergyController.postAdd);
	app.post(module + 'byid',commonFunction.ensureAuthorized,AllergyController.postByid);
	app.post(module +'edit',commonFunction.ensureAuthorized,AllergyController.postEdit);
	app.post(module +'remove',commonFunction.ensureAuthorized,AllergyController.postRemove);
	app.post(module+'idAllergy', commonFunction.ensureAuthorized, AllergyController.postIdAllergy);
	app.post(module+'allergyPatient', commonFunction.ensureAuthorized, AllergyController.postAllergyPatient);
	app.post(module+'removeAllergyPatient', commonFunction.ensureAuthorized, AllergyController.postRemoveAllergyPatient);
}