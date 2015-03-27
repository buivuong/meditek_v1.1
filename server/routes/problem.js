var ProblemController = require('../controllers/ProblemController');
var commonFunction = require('../function.js');

module.exports = function(app){

	var config = require('../config.js');
	var module = config.defaultUrl+'problem/';

	app.post(module+'list', commonFunction.ensureAuthorized, ProblemController.postList);
	app.post(module+'byid', commonFunction.ensureAuthorized, ProblemController.postByid);
	app.post(module+'add', commonFunction.ensureAuthorized, ProblemController.postAdd);
	app.post(module+'edit', commonFunction.ensureAuthorized, ProblemController.postEdit);
	app.post(module+'remove', commonFunction.ensureAuthorized, ProblemController.postRemove);

}