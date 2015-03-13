angular.module('app.loggedIn', [
	'app.loggedIn.controller',
	'app.loggedIn.home',
    'app.loggedIn.function',
    'app.loggedIn.timetable',
    'app.loggedIn.doctor'
])

.config(function ($stateProvider) {
    $stateProvider

    .state("loggedIn", {
        abstract: true,
        views: {
            "root": {
                templateUrl: "common/views/structure.html",
                controller: "LoggedInController"
            }
        }
    })
})