angular.module('app.loggedIn.function.models', [])

.factory('FunctionModel', function(Restangular){
	var mainModel = {};
	var mainApi = Restangular.all('function');

	mainModel.listWithMenu = function(){
		var instanceApi = mainApi.all('listWithMenu');
		return instanceApi.post({data: {user_id: 3}});
	}

	return mainModel;
})