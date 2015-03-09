angular.module('app.loggedIn.home.controllers.home', [])

.controller('HomeController', function($scope, Restangular){
	var instanceApi = Restangular.one('home/home');
	instanceApi.get().then(function(response){

	})
})