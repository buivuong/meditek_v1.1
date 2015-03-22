var AllergieController = require('../controllers/AllergieController');

var commonFunction = require('../function.js');

module.exports = function(app){
	var config = require('../config.js');
	var module = config.defaultUrl+'allergie/';

	app.post(module+'list', commonFunction.ensureAuthorized, AllergieController.postList);
	app.post(module+'add', commonFunction.ensureAuthorized, AllergieController.postAdd);
	app.post(module+'byid', commonFunction.ensureAuthorized, AllergieController.postById);
	app.post(module+'edit', commonFunction.ensureAuthorized, AllergieController.postEdit);
}