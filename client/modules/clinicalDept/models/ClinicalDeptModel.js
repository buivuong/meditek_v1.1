angular.module('app.loggedIn.clinicalDept.models', [])

.factory('ClinicalDeptModel', function(Restangular){
	var mainModel = {};
	var mainApi = Restangular.all('clinicalDept');

	mainModel.listAll = function(){
		var instanceApi = mainApi.one('listAll');
		return instanceApi.get();
	}

	return mainModel;
})