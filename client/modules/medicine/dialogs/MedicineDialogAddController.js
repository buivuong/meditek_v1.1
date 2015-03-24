angular.module('app.loggedIn.medicine.dialog.add',[])
.controller('MedicineAddDialogController', function($scope, MedicineModel, CommonModel, close, localStorageService){
	var closeDialog = function(params){
		close(params);
	}

	var save = function(form){
		var postData = angular.copy(form);

		postData.Created_by = postData.Last_updated_by = localStorageService.get('user').id;
		postData.Creation_date = postData.Last_update_date = moment().format('YYYY-MM-DD hh:mm:ss');

		MedicineModel.add(postData)
		.then(function(response){
			$scope.medicine.close(response.data);

		}, function(error){
			$scope.medicine.errors = angular.copy(error.data.errors);
			CommonModel.beforeError($scope.medicine.errors);
		})
	}

	$scope.medicine = {
		close: function(params){ closeDialog(params); },
		save: function(form){ save(form); },
		form: {
			medicine_name: '',
			isEnable: 1
		},
		errors: []
	}
});