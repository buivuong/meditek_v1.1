angular.module('app.loggedIn.timetable.controllers.definition', [])

.controller('TimetableDefinitionController', function($scope, $stateParams, DoctorModel, ServiceModel){
	var load = function(){
		DoctorModel.byId({doctor_id: $stateParams.doctorId})
		.then(function(response){
			$scope.doctor.name = response.data.NAME;
			ServiceModel.listByDept({clinical_dept_id: response.data.CLINICAL_DEPT_ID})
			.then(function(response){
				$scope.common_options.services = response.data;
			}, function(error){})
		}, function(error){})
	}

	$scope.doctor = {
		name: '',
		load: function(){ load(); }
	}

	$scope.doctor.load();
})