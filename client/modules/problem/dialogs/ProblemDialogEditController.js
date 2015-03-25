angular.module('app.loggedIn.problem.dialog.edit', [])

.controller('ProblemDialogEditController', function($scope, localStorageService, close, $stateParams, CommonModel, ProblemModel, $filter) {
	
	var load = function(){

		ProblemModel.byid({Problem_id: $scope.resolve.id})
		.then(function(response){
			$scope.problem.form = angular.copy(response.data);
			$scope.problem.form.From_date = $scope.problem.form.To_date = moment().format('DD/MM/YYYY');
		}, function(errors){})
	}

	$scope.problem = {

		load: function(){ load(); },
		form: {
			Patient_id: '',
			From_date: '',
			To_date: '',
			Notes: '',
			ICD10_code: '',
			ICPC_code: ''
		},
		errors: [],
		close: function(params){ close(params); }

	}
	$scope.problem.load();
})