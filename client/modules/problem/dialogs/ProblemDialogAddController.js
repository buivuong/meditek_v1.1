angular.module('app.loggedIn.problem.dialog.add', [])

.controller('ProblemDialogAddController', function($scope, ProblemModel, ModalService, CommonModel, close, localStorageService){

	var closeDialog = function(params){
		close(params);
	}

	var save = function(){
		CommonModel.beforeSave($scope.problem.errors);
		var postData = angular.copy($scope.problem.form);

		console.log(postData);

		postData.Created_by = postData.Last_updated_by = localStorageService.get('user').id;
		postData.Creation_date = postData.Last_update_date = moment().format('YYYY-MM-DD hh:mm:ss');
		postData.From_date = CommonModel.convertToDate(postData.From_date);
		postData.To_date = CommonModel.convertToDate(postData.To_date);

		ProblemModel.add(postData)
		.then(function(response){
			$scope.problem.close(response.data);
		}, function(error){
			$scope.problem.errors = angular.copy(error.data.errors);
			CommonModel.beforeError($scope.problem.errors);
		})
	}

	var patientClick = function(){
		ModalService.showModal({
			templateUrl: 'patientModal',
			controller: function($scope, close){
				angular.element('#problemModal').removeClass('active');
				angular.element('#problemModal').removeClass('visible');

				$scope.clickRow = function(row){
					close(row);
					angular.element('#problemModal').addClass('active');
					angular.element('#problemModal').addClass('visible');
				}

				$scope.close = function(params){
					close(params);
					angular.element('#problemModal').addClass('active');
					angular.element('#problemModal').addClass('visible');
				}

			}
		})
		.then(function(modal){
			modal.close.then(function(result){
				if(result) {
					$scope.problem.form.Patient_id = result.Patient_id;
					$scope.problem.Patient_name = result.First_name+result.Sur_name;
				}
			});
		})
	}

	$scope.problem = {
		save: function(params){ save(params); },
		close: function(form){ closeDialog(form); },
		form: {
			Patient_id: null,
			From_date: '',
			To_date: '',
			ICD10_code: '',
			ICPC_code: '',
			Notes: ''
		},
		Patient_name: '',
		errors: []

	}

	$scope.patient = {
		click: function(){ patientClick(); }
	}

})