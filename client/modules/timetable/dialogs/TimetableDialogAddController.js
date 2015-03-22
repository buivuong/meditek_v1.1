angular.module('app.loggedIn.timetable.dialog.add', [])

.controller('TimetableDialogAddController', function($scope, localStorageService, close, $stateParams, CommonModel, TimetableModel, $filter){
	var save = function(){
		CommonModel.beforeSave($scope.timetable.errors);

		var postData = angular.copy($scope.timetable.form);
		postData.Created_by = postData.Last_updated_by = localStorageService.get('user').id;
		postData.Creation_date = postData.Last_update_date = moment().format('YYYY-MM-DD hh:mm:ss');
		postData.doctor_id = $stateParams.doctorId;
		postData.from_time = CommonModel.convertToTime(postData.from_time);
		postData.to_time = CommonModel.convertToTime(postData.to_time);
		postData.from_date = CommonModel.convertToDate(postData.from_date);
		postData.to_date = CommonModel.convertToDate(postData.to_date);
		postData.isenable = 1;

		TimetableModel.add(postData).then(function(response){
			$scope.timetable.close(response.data);
		}, function(error){
			$scope.timetable.errors = angular.copy(error.data.errors);
			CommonModel.beforeError($scope.timetable.errors);
		})
	}

	$scope.timetable = {
		options: {
			DAY_OF_WEEK: $scope.resolve.options.DAY_OF_WEEK,
			services: $scope.resolve.options.services
		},
		form: {
			day_of_Week: '',
			SERVICE_ID: null,
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
})