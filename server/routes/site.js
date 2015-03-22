var SiteController = require('../controllers/SiteController');

var commonFunction = require('../function.js');

module.exports = function(app){
	var config = require('../config.js');
	var module = config.defaultUrl+'site/';

	app.post(module+'listByDept', commonFunction.ensureAuthorized, SiteController.postListByDept);
}