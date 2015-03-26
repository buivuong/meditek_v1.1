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

		.state('loggedIn.patientByid', {
			url: '/patient/:Patient_id',
			views: {
				'main-content': {
					templateUrl: 'modules/patient/views/patientbyid.html',
					controller: 'PatientByidController'
				}
			}//end views
		})
})