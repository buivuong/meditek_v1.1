angular.module("app.security", ['app.security.include'])

.config(function($stateProvider){
	$stateProvider

		.state('login', {
			url: '/login',
			views: {
				'root': {
					templateUrl: 'modules/security/views/login.html',
					controller: 'LoginController'
				}
			}//end views
		})
})