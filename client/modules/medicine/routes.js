angular.module('app.loggedIn.medicine',[
	'app.loggedIn.medicine.include'
])
.config(function($stateProvider){
	$stateProvider

	.state('loggedIn.medicine',{
		url:'/medicines',
		views: {
			'main-content': {
				templateUrl: 'modules/medicine/views/index.html'
			}
		}
	})
})
;