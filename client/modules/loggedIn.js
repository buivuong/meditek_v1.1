angular.module('app.loggedIn', [
	'app.loggedIn.controller',
	'app.loggedIn.home',
    'app.loggedIn.function',
    'app.loggedIn.timetable',
    'app.loggedIn.doctor',
    'app.loggedIn.service',
    'app.loggedIn.appointment',
    'app.loggedIn.problem',
    'app.loggedIn.site',
    'app.loggedIn.allergy',
    'app.loggedIn.patient',
    'app.loggedIn.medicine',
    'app.loggedIn.clinicalDept',
    'app.loggedIn.measurement'
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