angular.module('app.loggedIn.measurement',['app.loggedIn.measurement.include'])

.config(function($stateProvider){
	$stateProvider
	 .state('loggedIn.measurement', {
		url: '/measurement',
		views: {
			'main-content': {
				templateUrl: 'modules/measurement/views/list.html',
				controller: 'MeasurementListController'
			}//end main-content
		}//end views
	})

	.state('loggedIn.measurement.add', {
			url: '/add',
			views: {
				'main-content@loggedIn': {
					templateUrl: 'modules/measurement/views/add.html',
					controller: 'MeasurementAddController'
				}
			}//end views
		})
})