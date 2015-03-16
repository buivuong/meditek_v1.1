angular.module('app.loggedIn.controller', [])

.constant('DAY_OF_WEEK', [
	{value: 'Monday'},
	{value: 'Tuesday'},
	{value: 'Wednesday'},
	{value: 'Thursday'},
	{value: 'Friday'},
	{value: 'Saturday'}
])

.controller('LoggedInController', function($scope, FunctionModel, DAY_OF_WEEK){
	$scope.mFunction = {
		list: [],
		error: false
	}

	$scope.common_options = {
		DAY_OF_WEEK: DAY_OF_WEEK
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