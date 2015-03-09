angular.module('app.loggedIn', [
	'app.loggedIn.controller',
	'app.loggedIn.home'
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