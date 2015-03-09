angular.module('app.security.models', [])

.factory('SecurityModel', function(Restangular){
	var mainModel = {};
	var mainApi = Restangular.all('security');

	mainModel.login = function(credentials){
		var instanceApi = mainApi.all('login');
		return instanceApi.post({data: credentials});
	}

	return mainModel;
})