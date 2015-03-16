angular.module('app.loggedIn.doctor.models', [])

.factory('DoctorModel', function(Restangular){
	var mainModel = {};
	var mainApi = Restangular.all('doctor');

	mainModel.list = function(data){
		var instanceApi = mainApi.all('list');
		return instanceApi.post({data: data});
	}

	mainModel.byId = function(data){
		var instanceApi = mainApi.all('byId');
		return instanceApi.post({data: data});	
	}

	return mainModel;
})