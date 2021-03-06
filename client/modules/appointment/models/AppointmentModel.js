angular.module('app.loggedIn.appointment.models', [])

.factory('AppointmentModel', function(Restangular){
	var mainModel = {};
	var mainApi = Restangular.all('appointment');

	mainModel.byDoctor = function(data){
		var instanceApi = mainApi.all('byDoctor');
		return instanceApi.post({data: data});
	},

	mainModel.load = function(data){
		var instanceApi = mainApi.all('load');
		return instanceApi.post({data: data});
	}

	return mainModel;
})