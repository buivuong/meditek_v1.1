angular.module('app.loggedIn.controller', [])

.controller("LoggedInController", function($scope, FunctionModel){
	$scope.mFunction = {
		list: [],
		error: false
	}

	/* LOAD FUNCTION FIRST */
	var loadInit = function(){
		FunctionModel.listWithMenu().then(function(response){
			$scope.mFunction.list = response.data;
		}, function(error){

		})
	}
	/* END LOAD FUNCTION FIRST */

	loadInit();
})