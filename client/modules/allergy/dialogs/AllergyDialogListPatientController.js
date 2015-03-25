angular.module('app.loggedIn.allergy.dialog.listPatient', [])

.controller('AllergyDialogListPatientController', function($scope,close, $timeout){
	var closeDialog = function(params){
		close(params);
	}

	$scope.allergy = {
		close: function(params){ closeDialog(params); }
	}
})