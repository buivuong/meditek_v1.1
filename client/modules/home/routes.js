angular.module("app.loggedIn.home", ['app.loggedIn.home.include'])

.config(function($stateProvider){
	$stateProvider

		.state('loggedIn.home', {
			url: '/home',
			views: {
				'main-content': {
					templateUrl: 'modules/home/views/home.html',
					controller: 'HomeController'
				}
			}//end views
		})
})