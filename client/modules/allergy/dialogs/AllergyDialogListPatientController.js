angular.module('app.loggedIn.allergy.dialog.listPatient', [])

.controller('AllergyDialogListPatientController', function($scope,close, $timeout,CommonModel,AllergyModel,ModalService){
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
	$scope.clickRow = function(row){
		var form = {
			allergy_id:'',
			patient_id:''
		};
		form.allergy_id = $scope.resolve.id;
		form.patient_id = row.Patient_id;
		var postData = angular.copy(form);
		CommonModel.beforeSave($scope.allergy.errors);
		AllergyModel.allergyPatient(postData)
			.then(function(response){
				$scope.allergy.close(response.data);
			}, function(error){
				if(error.data.code != null)
					{
					ModalService.showModal({
	     				templateUrl: 'modules/allergy/dialogs/templates/notification.html',
						controller: 'AllergyDialogNotificationController'
		    			})
		    			.then(function(modal){
		    				modal.close.then(function(result){
		    					if(result) {
		    						scope.patient.load();
		    					}
		    				});
		    			})
					}
			})
		$scope.allergy.close(row);

	}


	$scope.allergy.load();

})