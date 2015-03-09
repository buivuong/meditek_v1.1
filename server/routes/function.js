var FunctionController = require('../controllers/FunctionController');

var commonFunction = require('../function.js');

module.exports = function(app){
	var config = require('../config.js');
	var module = config.defaultUrl+'function/';

	app.get(module+'listWithMenu', FunctionController.listWithMenu);
}