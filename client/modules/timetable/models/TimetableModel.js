angular.module('app.loggedIn.timetable.models', [])

.factory('TimetableModel', function(Restangular){
	var mainModel = {};
	var mainApi = Restangular.all('timetable');

	mainModel.one = function(data){
		var instanceApi = mainApi.all('one');
		return instanceApi.post({data: data});
	}

	mainModel.list = function(data){
		var instanceApi = mainApi.all('list');
		return instanceApi.post({data: data});
	}

	mainModel.add = function(data){
		var instanceApi = mainApi.all('add');
		return instanceApi.post({data: data});
	}

	mainModel.update = function(data){
		var instanceApi = mainApi.all('update');
		return instanceApi.post({data: data});
	}

	mainModel.createTimetable = function(data){
		var instanceApi = mainApi.all('createTimetable');
		return instanceApi.post({data: data});
	}

	mainModel.remove = function(data){
		var instanceApi = mainApi.all('remove');
		return instanceApi.post({data: data});
	}

	mainModel.siteOne = function(data){
		var instanceApi = mainApi.all('site/one');
		return instanceApi.post({data: data});
	}

	mainModel.siteList = function(data){
		var instanceApi = mainApi.all('site/list');
		return instanceApi.post({data: data});
	}

	mainModel.siteAdd = function(data){
		var instanceApi = mainApi.all('site/add');
		return instanceApi.post({data: data});
	}

	mainModel.siteUpdate = function(data){
		var instanceApi = mainApi.all('site/update');
		return instanceApi.post({data: data});
	}

	mainModel.siteRemove = function(data){
		var instanceApi = mainApi.all('site/remove');
		return instanceApi.post({data: data});
	}

	return mainModel;
})