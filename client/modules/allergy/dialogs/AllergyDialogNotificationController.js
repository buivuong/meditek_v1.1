angular.module('app.loggedIn.allergy.dialog.notification', [])

.controller('AllergyDialogNotificationController', function($scope,close){
	var closeDialog = function(params){
		close(params);
	}
	var load = function(){

	}
	$scope.allergy = {
		load: function(){ load(); },
		close: function(params){ closeDialog(params); },
		errors: []
	}
})