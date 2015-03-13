angular.module('app.loggedIn.timetable.models', [])

.factory('TimetableModel', function(Restangular){
	var mainModel = {};
	var mainApi = Restangular.all('timetable');

	mainModel.list = function(data){
		var instanceApi = mainApi.all('list');
		return instanceApi.post({data: data});
	}

	return mainModel;
})