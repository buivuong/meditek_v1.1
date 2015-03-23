angular.module('app.loggedIn.allergy.models', [])

.factory('AllergyModel', function(Restangular){
	var mainModel = {};
	var mainApi = Restangular.all('allergy');

	mainModel.list = function(data){
		var instanceApi = mainApi.all('list');
		return instanceApi.post({data: data});
	}

	return mainModel;
})