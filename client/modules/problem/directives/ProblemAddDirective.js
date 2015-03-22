angular.module('app.loggedIn.problem.directives.add', [])

.directive('problemAdd', function($state, ProblemModel, localStorageService){
	return {
		restrict: 'EA',
		templateUrl: 'modules/problem/directives/templates/add.html',
		link: function(scope, elem, attrs){
			var form = {
				patient_id: null,
				from_date: null,
				to_date: null,
				Notes: '',
				ICD10_code: '',
				ICPC_code: ''
			}

			var save = function(){
				var postData = angular.copy(scope.problem.form);
				postData.Created_by = postData.Last_updated_by = localStorageService.get('user').id;
				postData.Creation_date = postData.Last_update_date = moment().format('YYYY-MM-DD hh:mm:ss');
				ProblemModel.add(postData)
				.then(function(response){

				}, function(error){

				})
			}

			scope.problem = {
				form: form,
				save: function(){ save(); }
			}
		}
	}//end return
})