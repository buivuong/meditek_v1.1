angular.module('app.loggedIn.problem.dialog.add', [])

.controller('ProblemDialogAddController', function($scope, ProblemModel, CommonModel, close, localStorageService){

	var closeDialog = function(params){
		close(params);
	}

	var save = function(form){
		CommonModel.beforeSave($scope.problem.errors);
		var postData = angular.copy(form);
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

	$scope.problem = {
		save: function(params){ save(params); },
		close: function(form){ closeDialog(form); },
		form: {
			Patient_id: 1,
			From_date: '',
			To_date: '',
			ICD10_code: '',
			ICPC_code: '',
			Notes: ''
		},
		errors: []

	}

})