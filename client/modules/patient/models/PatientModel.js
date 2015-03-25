angular.module('app.loggedIn.patient.models', [])

.factory('PatientModel', function(Restangular){
	var mainModel = {};
	var mainApi = Restangular.all('patient');

	mainModel.list = function(data){
		var instanceApi = mainApi.all('list');
		return instanceApi.post({data: data});
	}
	return mainModel;
})