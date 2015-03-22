var TimetableController = require('../controllers/TimetableController');

var commonFunction = require('../function.js');

module.exports = function(app){
	var config = require('../config.js');
	var module = config.defaultUrl+'timetable/';

	app.post(module+'list', commonFunction.ensureAuthorized, TimetableController.postList);
	app.post(module+'one', commonFunction.ensureAuthorized, TimetableController.postOne);
	app.post(module+'add', commonFunction.ensureAuthorized, TimetableController.postAdd);
	app.post(module+'update', commonFunction.ensureAuthorized, TimetableController.postUpdate);
	app.post(module+'remove', commonFunction.ensureAuthorized, TimetableController.postRemove);
	app.post(module+'createTimetable', commonFunction.ensureAuthorized, TimetableController.postCreateTimetable);

	/* SITE */
	app.post(module+'site/list', commonFunction.ensureAuthorized, TimetableController.postSiteList);
	app.post(module+'site/one', commonFunction.ensureAuthorized, TimetableController.postSiteOne);
	app.post(module+'site/add', commonFunction.ensureAuthorized, TimetableController.postSiteAdd);
	app.post(module+'site/update', commonFunction.ensureAuthorized, TimetableController.postSiteUpdate);
	app.post(module+'site/remove', commonFunction.ensureAuthorized, TimetableController.postSiteRemove);
	/* END SITE */
}