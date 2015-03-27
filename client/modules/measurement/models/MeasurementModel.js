angular.module('app.loggedIn.measurement.models', [])

.factory('MeasurementModel', function(Restangular){
	var mainModel = {};
	var mainApi = Restangular.all('measurement');

	mainModel.list = function(data){
		var instanceApi = mainApi.all('list');
		return instanceApi.post({data: data});
	}

	mainModel.add = function(data){
		var instanceApi = mainApi.all('add');
		return instanceApi.post({data: data});
	}

	mainModel.remove = function(data){
		var instanceApi = mainApi.all('remove');
		return instanceApi.post({data: data});
	}

	mainModel.byid = function(data){
		var instanceApi = mainApi.all('byid');
		return instanceApi.post({data: data});
	}

	mainModel.edit = function(data){
		var instanceApi = mainApi.all('edit');
		return instanceApi.post({data: data});
	}
	return mainModel;
})