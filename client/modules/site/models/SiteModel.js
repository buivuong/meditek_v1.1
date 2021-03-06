angular.module('app.loggedIn.site.models', [])

.factory('SiteModel', function(Restangular){
	var mainModel = {};
	var mainApi = Restangular.all('site');

	mainModel.listByDept = function(data){
		var instanceApi = mainApi.all('listByDept');
		return instanceApi.post({data: data});
	}

	mainModel.listAll = function(){
		var instanceApi = mainApi.one('listAll');
		return instanceApi.get();
	}

	return mainModel;
})