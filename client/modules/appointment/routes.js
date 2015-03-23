angular.module('app.loggedIn.appointment', ['app.loggedIn.appointment.include'])

.config(function($stateProvider){
	$stateProvider

		.state('loggedIn.appointment', {
			url: '/appointment',
			views: {
				'main-content': {
					templateUrl: 'modules/appointment/views/index.html',
					controller: 'AppointmentController'
				}
			}
		})
})