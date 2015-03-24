angular.module('app.loggedIn.allergy.dialog.add', [])

.controller('AllergyDialogAddController', function($scope, AllergyModel, CommonModel, close, localStorageService){

	var closeDialog = function(params){
		close(params);
	}

	var save = function(form){
		
		CommonModel.beforeSave($scope.allergy.errors);
		var postData = angular.copy(form);
		postData.Created_by = postData.Last_updated_by = localStorageService.get('user').id;
		postData.Creation_date = postData.Last_update_date = moment().format('YYYY-MM-DD hh:mm:ss');

		AllergyModel.add(postData)
		.then(function(response){
			$scope.allergy.close(response.data);

		}, function(error){

			$scope.allergy.errors = angular.copy(error.data.errors);
			CommonModel.beforeError($scope.allergy.errors);
		})
	}


	$scope.allergy = {
		close: function(params){ closeDialog(params); },
		save: function(form){ save(form); },
		form: {
			allergy_name: '',
			isEnable: 1
		},
		errors: []
	}
})