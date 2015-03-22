angular.module('app.loggedIn.timetable.dialog.edit', [])

.controller('TimetableDialogEditController', function($scope, localStorageService, close, $stateParams, CommonModel, TimetableModel, $filter){
	var save = function(){
		CommonModel.beforeSave($scope.timetable.errors);

		var postData = angular.copy($scope.timetable.form);
		postData.Last_updated_by = localStorageService.get('user').id;
		postData.Last_update_date = moment().format('YYYY-MM-DD hh:mm:ss');
		postData.doctor_id = $stateParams.doctorId;
		postData.from_time = CommonModel.convertToTime(postData.from_time);
		postData.to_time = CommonModel.convertToTime(postData.to_time);
		postData.from_date = CommonModel.convertToDate(postData.from_date);
		postData.to_date = CommonModel.convertToDate(postData.to_date);
		postData.isenable = 1;

		TimetableModel.update(postData).then(function(response){
			$scope.timetable.close(response.data);
		}, function(error){
			$scope.timetable.errors = angular.copy(error.data.errors);
			CommonModel.beforeError($scope.timetable.errors);
		})
	}

	var load = function(){
		TimetableModel.one({cal_header_df_id: $scope.resolve.id})
		.then(function(response){
			$scope.timetable.form = angular.copy(response.data);
			$scope.timetable.form.from_date = moment($scope.timetable.form.from_date).format('DD/MM/YYYY');
			$scope.timetable.form.to_date = moment($scope.timetable.form.to_date).format('DD/MM/YYYY');
		}, function(error){})
	}

	$scope.timetable = {
		options: {
			DAY_OF_WEEK: $scope.resolve.options.DAY_OF_WEEK,
			services: $scope.resolve.options.services
		},
		load: function(){ load(); },
		form: {
			day_of_Week: '',
			service_id: null,
			from_time: '',
			to_time: '',
			from_date: null,
			to_date: null,
			description: ''
		},
		errors: [],
		save: function(){ save(); },
		close: function(params) { close(params); }
	}

	//INIT
	$scope.timetable.load();
})