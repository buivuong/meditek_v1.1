var commonFunction = require('../function.js');

module.exports = function(app){
	var config = require('../config.js');
	var module = config.defaultUrl+'home/';

	app.get(module+'home', commonFunction.ensureAuthorized, function(req, res){
		res.json({message: 'success'});
	});
}