angular.module('app.loggedIn.allergy.directives.list', [])

.directive('allergyList', function(AllergyModel, ModalService, $filter,$state){
	return {
		restrict: 'EA',
		templateUrl: 'modules/allergy/directives/templates/list.html',
		scope: {
			options: '='
		},
		link: function(scope, elem, attrs){
			var search = {
				page: 1,
				offset: 0,
				limit: 10,
				allergy_name: '',
				Creation_date: 'desc'
			}

			var load = function(){
				scope.allergy.loading = true;
				AllergyModel.list(search).then(function(response){
					scope.allergy.loading = false;
					scope.allergy.error = '';
					scope.allergy.list = response.data;
					scope.allergy.count = response.count;
					scope.allergy.search.page = 1;
				}, function(error){
					scope.allergy.loading = false;
					scope.allergy.error = $filter('translate')(error.data.code);
				})
			}

			var onSearch = function(option){
				switch(option.field){
					case 'allergy_name':
						scope.allergy.search.allergy_name = option.value;
						break;
				}//end switch
				scope.allergy.load();
				loadPage(1);
			}

			var sort = function(option){
				scope.allergy.search.Creation_date = option.by;
				scope.allergy.load();
			}

			var loadPage = function(page){
				scope.allergy.search.offset = (page-1)*scope.allergy.search.limit;
				scope.allergy.load();
			}

			var add = function(){
				ModalService.showModal({
					templateUrl: 'modules/allergy/dialogs/templates/add.html',
					controller: 'AllergyDialogAddController'
				})
				.then(function(modal){
    				modal.close.then(function(result){
    					if(result) {
    						scope.allergy.load();
    					}
    				});
    			})
			}

			var edit = function(id){
				ModalService.showModal({
					resolve: {options: scope.options, id: id},
     				templateUrl: 'modules/allergy/dialogs/templates/edit.html',
					controller: 'AllergyDialogEditController'
    			})
    			.then(function(modal){
    				modal.close.then(function(result){
    					if(result) {
    						scope.allergy.load();
    					}
    				});
    			})
			}

			var removeAllergy = function(id){
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
							AllergyModel.remove(result).then(function(deleted){
								scope.allergy.load();
							}, function(error){});
						}
					})
				})
			}
			var listPatient = function(id){
				$state.go('loggedIn.allergy.listpatient',{allergyId:id});
			}
			scope.allergy = {
				dialog: {
					add: function(){ add(); },
					edit:function(id){edit(id);},
					removeAllergy:function(id){removeAllergy(id);}
				},
				search: search,
				error: '',
				count: 0,
				loading: false,
				list: [],
				listPatient:function(id){listPatient(id);},
				load: function(){ load(); },
				loadPage: function(page){ loadPage(page); },
				onSearch: function(option){ onSearch(option)},
				sort: function(option){ sort(option)}
			}

			/* LOAD FIRST */
			scope.allergy.load();
			/* END LOAD FIRST */
		}//end link
	}//end return
})