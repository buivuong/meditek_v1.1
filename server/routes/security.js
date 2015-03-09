var SecurityController = require('../controllers/SecurityController');

module.exports = function(app){
	var config = require('../config.js');
	var module = config.defaultUrl+'security/';

	app.post(module+'login', SecurityController.postLogin);
}