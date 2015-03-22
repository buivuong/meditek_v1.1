angular.module('app.loggedIn.problem', ['app.loggedIn.problem.include'])

.config(function($stateProvider){
	$stateProvider

	.state('loggedIn.problem', {
		url: '/problem',
		views: {
			'main-content': {
				templateUrl: 'modules/problem/views/list.html',
				controller: 'ProblemListController'
			}
		}//end views
	})

	.state('loggedIn.problem.add', {
		url: '/add',
		views: {
			'main-content@loggedIn': {
				templateUrl: 'modules/problem/views/add.html',
				controller: 'ProblemAddController'
			}
		}//end views
	})
})