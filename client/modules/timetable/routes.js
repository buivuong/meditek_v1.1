angular.module('app.loggedIn.timetable', ['app.loggedIn.timetable.include'])

.config(function($stateProvider){
	$stateProvider

		.state('loggedIn.timetable', {
			url: '/timetable',
			views: {
				'main-content': {
					templateUrl: 'modules/timetable/views/index.html',
					controller: 'TimetableController'
				}
			}
		})

		.state('loggedIn.timetable.definition', {
			url: '/doctor/:doctorId/definition',
			views: {
				'main-content@loggedIn': {
					templateUrl: 'modules/timetable/views/definition.html',
					controller: 'TimetableDefinitionController'
				}
			}
		})
})