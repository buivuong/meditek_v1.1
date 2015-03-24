angular.module('app.loggedIn.medicine.directive.list',[])
.directive('medicineList', function(MedicineModel, ModalService, $filter){
	return{
		restrict: 'EA',
		templateUrl: 'modules/medicine/directives/templates/list.html',
		scope: {
			onRowClick: '&'
		},
		link: function(scope, elem, attrs){

			var search = {
				page: 1,
				offset: 0,
				limit: 10,
				medicine_name: '',
				Creation_date: 'desc'
			}

			var load = function(){
				scope.medicine.loading = true;
				MedicineModel.list(search).then(function(response){
					console.log('this is resopnse', response);
					scope.medicine.loading = false;
					scope.medicine.error = '';
					scope.medicine.list = response.data;
					scope.medicine.count = response.count;
				}, function(error){
					scope.medicine.loading = false;
					scope.medicine.error = $filter('translate')(error.data.code);
				})
			};

			var sort = function(option){
				scope.medicine.search.Creation_date = option.by;
				scope.medicine.load();
			}

			var loadPage = function(page){
				scope.medicine.search.offset = (page-1)*scope.medicine.search.limit;
				scope.medicine.load();
			}

			var onSearch = function(option){
				switch(option.field){
					case 'medicine_name':
						scope.medicine.search.medicine_name = option.value;
						break;
				}//end switch
				scope.medicine.load();
			}

			var add = function(){
				ModalService.showModal({
					templateUrl: 'modules/medicine/dialogs/templates/add.html',
					controller: 'MedicineAddDialogController'
				});
			}

			var edit = function(id){
				ModalService.showModal({
					resolve: {options: scope.options, id: id},
     				templateUrl: 'modules/medicine/dialogs/templates/edit.html',
					controller: 'MedicineEditDialogController'
    			})
    			.then(function(modal){
    				modal.close.then(function(result){
    					if(result) {
    						scope.medicine.load();
    					}
    				});
    			})
			}

			var removeMedicine = function(id){
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
							MedicineModel.remove(result).then(function(deleted){
								scope.medicine.load();
							}, function(error){});
						}
					})
				})
			}

			scope.medicine = {
				dialog: {
					add: function(){ add(); },
					edit:function(id){edit(id);},
					removeMedicine:function(id){removeMedicine(id);}
				},
				search: search,
				error: '',
				count: 0,
				loading: false,
				list: [],
				load: function(){ load(); }, 
				loadPage: function(page){ loadPage(page); },
				sort: function(option){ sort(option); },
				onSearch: function(option){ onSearch(option); }
			};

			// LOAD FIRST
			scope.medicine.load();
		}
	}
});