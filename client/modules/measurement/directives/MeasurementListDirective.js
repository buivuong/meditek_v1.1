angular.module('app.loggedIn.measurement.directives.list', [])

.directive('listMeasurement', function(MeasurementModel, ModalService, $filter,$state){
	return {
		restrict: 'EA',
		templateUrl: 'modules/measurement/directives/templates/list.html',
		scope: {
			options: '='
		},
		link: function(scope, elem, attrs){
			var search = {
				page: 1,
				offset: 0,
				limit: 10,
				measure_id: '',
				patient_id :'',
				First_name :'',
				Sur_name :'',
				measurement_date :'',
				Creation_date: 'desc'
			}

			var load = function(){
				scope.measurement.loading = true;

				MeasurementModel.list(search).then(function(response){
					scope.measurement.loading = false;
					scope.measurement.error = '';
					scope.measurement.list = response.data;
					scope.measurement.count = response.count;
					scope.measurement.search.page = 1;
				}, function(error){
					scope.measurement.loading = false;
					scope.measurement.error = $filter('translate')(error.data.code);
				})
			}

			var onSearch = function(option){
				switch(option.field){
					case 'measurement_name':
						scope.measurement.search.measurement_name = option.value;
						break;
					case 'measurement_id':
						scope.measurement.search.measurement_name = option.value;
						break;
				}//end switch
				scope.measurement.load();
				loadPage(1);
			}

			var sort = function(option){
				scope.measurement.search.Creation_date = option.by;
				scope.measurement.load();
			}

			var loadPage = function(page){
				scope.measurement.search.offset = (page-1)*scope.measurement.search.limit;
				scope.measurement.load();
			}

			 scope.addClick = function(){
		 		$state.go('loggedIn.measurement.add');
		   	}
		   	scope.remove = function(id){
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
						if(result){
							MeasurementModel.remove(result).then(function(deleted){
								scope.measurement.load();
							}, function(error){});
						}
					})
				})

		   	}

		   	scope.edit = function(id){
				$state.go('loggedIn.measurement.edit',{measure_id :id});
			}
			scope.measurement = {
				search: search,
				error: '',
				count: 0,
				loading: false,
				list: [],
				load: function(){ load(); },
				loadPage: function(page){ loadPage(page); },
				onSearch: function(option){ onSearch(option)},
				sort: function(option){ sort(option)}
			}

			/* LOAD FIRST */
			scope.measurement.load();
			/* END LOAD FIRST */
		}//end link
		
	}//end return
})