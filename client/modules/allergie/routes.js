angular.module('app.loggedIn.allergie',['app.loggedIn.allergie.include'])

.config(function($stateProvider){
	$stateProvider

		.state('loggedIn.allergie',{
			url:'/allergies',
			views: {
				'main-content': {
					templateUrl: 'modules/allergie/views/index.html',
					controller: 'AllergieIndexController'
				}
			}
		})
});