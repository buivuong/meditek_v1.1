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

	.state('loggedIn.allergy.listpatient', {
		url: '/:allergyId/patient',
		views: {
			'main-content@loggedIn': {
				templateUrl: 'modules/allergy/views/listPatient.html',
				controller: 'AllergyListPatientController'
			}
		}//end views
	})
})