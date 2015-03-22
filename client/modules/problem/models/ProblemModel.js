angular.module('app.loggedIn.problem.models', [])

.factory('ProblemModel', function(Restangular){
	var mainModel = {};
	var mainApi = Restangular.all('problem');

	mainModel.add = function(data){
		var instanceApi = mainApi.all('add');
		return instanceApi.post({data: data});
	}

	return mainModel;
})