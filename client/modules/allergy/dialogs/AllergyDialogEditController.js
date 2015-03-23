angular.module('app.loggedIn.allergy.dialog.edit', [])

.controller('AllergyDialogEditController', function($scope, localStorageService, close, $stateParams, CommonModel, AllergyModel, $filter){
	var save = function(){
		CommonModel.beforeSave($scope.allergy.errors);
		console.log("aaaa");

		var postData = angular.copy($scope.allergy.form);
		postData.Last_updated_by = localStorageService.get('user').id;
		postData.Last_update_date = moment().format('YYYY-MM-DD hh:mm:ss');

		console.log(postData);
		AllergyModel.edit(postData).then(function(response){
			$scope.allergy.close(response.data);
		}, function(error){
			$scope.allergy.errors = angular.copy(error.data.errors);
			CommonModel.beforeError($scope.allergy.errors);
		})
	}

	var load = function(){
		AllergyModel.byid({allergy_id: $scope.resolve.id})
		.then(function(response){
			$scope.allergy.form = angular.copy(response.data);
		}, function(error){})
	}

	$scope.allergy = {
		load: function(){ load(); },
		form: {
			allergy_name: ''
		},
		errors: [],
		save: function(){ save(); },
		close: function(params) { close(params); }
	}

	//INIT
	$scope.allergy.load();
})