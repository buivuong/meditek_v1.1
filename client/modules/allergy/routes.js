angular.module('app.loggedIn.allergy', [
	'app.loggedIn.allergy.include'
])

.config(function($stateProvider){
	$stateProvider

	.state('loggedIn.allergy', {
		url: '/allergy',
		views: {
			'main-content': {
				templateUrl: 'modules/allergy/views/list.html',
				controller: 'AllergyListController'
			}//end main-content
		}//end views
	})
})