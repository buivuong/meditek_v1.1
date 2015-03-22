angular.module('app.loggedIn.problem.directives.list', [])

.directive('problemList', function($state){
	return {
		restrict: 'EA',
		templateUrl: 'modules/problem/directives/templates/list.html',
		link: function(scope, elem, attrs){
			scope.goToAdd = function(){
				$state.go('loggedIn.problem.add');
			}
		}
	}//end return
})