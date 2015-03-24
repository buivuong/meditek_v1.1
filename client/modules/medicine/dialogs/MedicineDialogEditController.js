angular.module('app.loggedIn.medicine.dialog.edit',[])
.controller("MedicineEditDialogController",function($scope, MedicineModel, CommonModel, close, localStorageService){

	var load = function(){
		MedicineModel.byid({medicine_id: $scope.resolve.id})
		.then(function(response){
			$scope.medicine.form = angular.copy(response.data);
		}, function(error){})
	}

	var save = function(){
		CommonModel.beforeSave($scope.medicine.errors);

		var postData = angular.copy($scope.medicine.form);
		postData.Last_updated_by = localStorageService.get('user').id;
		postData.Last_update_date = moment().format('YYYY-MM-DD hh:mm:ss');

		console.log(postData);
		MedicineModel.edit(postData).then(function(response){
			$scope.medicine.close(response.data);
		}, function(error){
			$scope.medicine.errors = angular.copy(error.data.errors);
			console.log('those are errors', $scope.medicine.errors);
			CommonModel.beforeError($scope.medicine.errors);
		})
	}

	$scope.medicine = {
		load: function(){ load(); },
		close: function(params){ close(params); },
		save: function(form){ save(form); },
		form: {
			medicine_name: '',
			medicine_price: null,
			medicine_unit: '',
			isEnable: 1
		},
		errors: [],
		units: CommonModel.getMedicineUnit()
	}

	//INIT
	$scope.medicine.load();
});