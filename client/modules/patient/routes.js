angular.module("app.loggedIn.patient", ['app.loggedIn.patient.include'])

.config(function($stateProvider){
	$stateProvider

		.state('loggedIn.patient', {
			url: '/patient',
			views: {
				'main-content': {
					templateUrl: 'modules/patient/views/list.html',
					controller: 'PatientListController'
				}
			}//end views
		})
})