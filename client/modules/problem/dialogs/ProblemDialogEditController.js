angular.module('app.loggedIn.problem.dialog.edit', [])

.controller('ProblemDialogEditController', function($scope, localStorageService, ModalService, close, $stateParams, CommonModel, ProblemModel, $filter){

	var closeDialog = function(form){
		close(form);
	}

	var load = function(){

		ProblemModel.byid({Problem_id: $scope.resolve.id})
		.then(function(response){
			$scope.problem.form = angular.copy(response.data);
			$scope.problem.Patient_name = response.data.First_name+response.data.Sur_name;
			$scope.problem.form.From_date = moment($scope.problem.form.From_date).format('DD/MM/YYYY');
			$scope.problem.form.To_date = moment($scope.problem.form.To_date).format('DD/MM/YYYY');

		}, function(errors){})
	}

	var save = function(){

		CommonModel.beforeSave($scope.problem.errors);
		var postData = angular.copy($scope.problem.form);
		postData.Last_updated_by = localStorageService.get('user').id;
		postData.Last_update_date = moment().format('YYYY-MM-DD hh:mm:ss');

		ProblemModel.edit(postData).then(function(response){
			$scope.problem.close(response.data);
		}, function(error){
			$scope.problem.errors = angular.copy(error.data.errors);
			CommonModel.beforeError($scope.problem.errors);
		})

	}

	var patienClick = function(){

		ModalService.showModal({

			templateUrl: 'patientModal',
			controller: function($scope, close){
				angular.element('#problemModal').removeClass('active');
				angular.element('#problemModal').removeClass('visible');

				$scope.clickRow = function(row){
					close(row);
					angular.element('#problemModal').removeClass('active');
					angular.element('#problemModal').removeClass('visible');
				}
				$scope.close = function(params){
					close(params);
					angular.element('#problemModal').removeClass('active');
					angular.element('#problemModal').removeClass('visible');
				}

			}

		})
		.then(function(modal){
			modal.close.then(function(result){
				if(result){
					$scope.problem.form.Patient_id = result.Patient_id;
					$scope.problem.Patient_name = result.First_name+result.Sur_name;
				}
			});
		})

	}

	$scope.problem = {

		load: function(){ load(); },
		form:{

			Patient_id: '',
			From_date: '',
			To_date: '',
			ICD10_code: '',
			ICPC_code: '',
			Notes: ''
		
		},
		Patient_name: '',
		errors: [],
		save: function(){ save(); },
		close: function(form){ closeDialog(form); }

	}
	$scope.patient = {
		click: function(){ patienClick(); }
	}

	$scope.problem.load();
})