var AllergyController = require('../controllers/AllergyController');

var commonFunction = require('../function.js');

module.exports = function(app){
	var config = require('../config.js');
	var module = config.defaultUrl+'allergy/';

	app.post(module+'list', commonFunction.ensureAuthorized, AllergyController.postList);
}