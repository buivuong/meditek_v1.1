var ProblemController = require('../controllers/ProblemController');

var commonFunction = require('../function.js');

module.exports = function(app){
	var config = require('../config.js');
	var module = config.defaultUrl+'problem/';

	app.post(module+'add', commonFunction.ensureAuthorized, ProblemController.postAdd);
}