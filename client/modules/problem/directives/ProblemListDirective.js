angular.module('app.loggedIn.problem.directives.list', [])

.directive('problemList', function(ProblemModel, ModalService, $filter){

	return{

		restrict: 'EA',
		templateUrl: 'modules/problem/directives/templates/list.html',
		scope: {
			options: '='
		},
		link: function(scope, elem, attrs){

			var search = {

				page: 1,
				offset: 0,
				limit: 20,
				ICD10_code: '',
				ICPC_code: '',
				Creation_date: 'desc'

			}

			var load = function(){

				scope.problem.loading = true;
				ProblemModel.list(search).then(function(response){
					scope.problem.loading = false;
					scope.problem.error = '';
					scope.problem.list = response.data;
					scope.problem.count = response.count;
					scope.problem.search.page = 1;
				},function(error){
					scope.problem.loading = false;
					scope.problem.error = $filter('translate')(error.data.code);
				})

			}

			var onSearch = function(option){

				switch(option.field){
					case 'ICD10_code':{
						scope.problem.search.ICD10_code = option.value;
						break;
					}
					case 'ICPC_code':{
						scope.problem.search.ICPC_code = option.value;
						break;
					}
				}

				scope.problem.load();
				loadPage(1);
			}

			var sort = function(option){

				scope.problem.search.Creation_date = option.by;
				scope.problem.load();

			}

			var loadPage = function(page){

				scope.problem.search.offset = (page-1)*scope.problem.search.limit;
				scope.problem.load();

			}

			var add = function(){

				ModalService.showModal({
					templateUrl: 'modules/problem/dialogs/templates/add.html',
					controller: 'ProblemDialogAddController'
				})
				.then(function(modal){
					modal.close.then(function(result){
						if(result){
							scope.problem.load();
						}
					});
				})

			}

			var edit = function(id){

				ModalService.showModal({
					resolve: {options: scope.options, id: id},
					templateUrl: 'modules/problem/dialogs/templates/edit.html',
					controller: 'ProblemDialogEditController'

				})
				.then(function(modal){
					console.log(modal);
					modal.close.then(function(result){
						if(result){
							scope.problem.load();
						}
					});
				})
			}

			var removeProblem = function(id){
			    ModalService.showModal({
			     resolve: {id: id},
			     templateUrl: 'common/views/remove.html',
			     controller: function($scope, close){
			      $scope.close = function(params){
			       close(params);
			      }
			     }
			    }).then(function(modal){
			     modal.close.then(function(result){
			     	console.log(result);
			      if(result){
			       ProblemModel.remove(result).then(function(deleted){
			        scope.problem.load();
			       }, function(error){});
			      }
			     })
			    })
			   }

			scope.problem = {
				dialog: {
					add: function(){ add(); },
					edit: function(id){ edit(id); },
					removeProblem: function(id){ removeProblem(id); }
				},
				search: search,
				error: '',
				count: 0,
				loading: false,
				list: [],
				load: function(){ load(); },
				loadPage: function(page){ loadPage(page); },
				onSearch: function(option){ onSearch(option); },
				sort: function(option){ sort(option); }

			}

			scope.problem.load();	
		}//end link

	}//end return 

})