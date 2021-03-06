angular.module('app.loggedIn.timetable.controllers.index', [])

.controller('TimetableController', function($scope, $state){
	$scope.module = {
		menus: [
			{name: 'Timetable', url: 'loggedIn.timetable'},
			{name: 'List Of Doctor', active: true}
		]
	}

	var onRowClick = function(row){
		$state.go('loggedIn.timetable.definition', {doctorId: row.doctor_id});
	}

	$scope.doctor = {
		onRowClick: function(row){
			onRowClick(row);
		}
	}//end doctor
})