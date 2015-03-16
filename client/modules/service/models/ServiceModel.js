angular.module('app.loggedIn.service.models', [])

.factory('ServiceModel', function(Restangular){
	var mainModel = {};
	var mainApi = Restangular.all('service');

	mainModel.listByDept = function(data){
		var instanceApi = mainApi.all('listByDept');
		return instanceApi.post({data: data});
	}

	return mainModel;
})