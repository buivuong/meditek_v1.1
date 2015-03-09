angular.module('app.security.controllers.login', [])

.controller('LoginController', function($scope, $filter, $state, SecurityModel, localStorageService){
	var models = {
		user_name: null,
		password: null
	}

	var errors = {
		enable: false,
		messages: []
	}

	var onLoginClick = function(models){
		var onSuccess = function(response){
			$state.go('loggedIn.home');
			localStorageService.set('user', response.user);
		}

		var onError = function(error){
			$scope.credentials.errors = angular.copy(errors);
			$scope.credentials.errors.enable = true;
			$scope.credentials.errors.messages.push($filter('translate')(error.data.code));
		}

		SecurityModel.login(models).then(onSuccess, onError);
	}

	/* INIT */
	$scope.credentials = {
		models: models,
		login: {
			click: function(models){
				onLoginClick(models);
			}
		},
		errors: errors
	}
	/* END INIT */
})