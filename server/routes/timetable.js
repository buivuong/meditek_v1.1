var TimetableController = require('../controllers/TimetableController');

var commonFunction = require('../function.js');

module.exports = function(app){
	var config = require('../config.js');
	var module = config.defaultUrl+'timetable/';

	app.post(module+'list', commonFunction.ensureAuthorized, TimetableController.postList);
	app.post(module+'add', commonFunction.ensureAuthorized, TimetableController.postAdd);
}