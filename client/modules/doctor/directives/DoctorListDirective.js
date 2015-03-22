angular.module('app.loggedIn.doctor.directives.list', [])

.directive('doctorList', function(DoctorModel, $filter){
	return {
		restrict: 'EA',
		templateUrl: 'modules/doctor/directives/templates/list.html',
		scope: {
			onRowClick: '&'
		},
		link: function(scope, elem, attrs){
			var search = {
				page: 1,
				offset: 0,
				limit: 10,
				NAME: '',
				Email: '',
				Phone: '',
				Creation_date: 'desc'
			}

			var load = function(){
				scope.doctor.loading = true;
				DoctorModel.list(search).then(function(response){
					scope.doctor.loading = false;
					scope.doctor.error = '';
					scope.doctor.list = response.data;
					scope.doctor.count = response.count;
					scope.doctor.search.page = 1;
				}, function(error){
					scope.doctor.loading = false;
					scope.doctor.error = $filter('translate')(error.data.code);
				})
			}

			var loadPage = function(page){
				scope.doctor.search.offset = (page-1)*scope.doctor.search.limit;
				scope.doctor.load();
			}

			var sort = function(option){
				scope.doctor.search.Creation_date = option.by;
				scope.doctor.load();
			}

			var onSearch = function(option){
				switch(option.field){
					case 'NAME':
						scope.doctor.search.NAME = option.value;
						break;
					case 'Email':
						scope.doctor.search.Email = option.value;
						break;
					case 'Phone':
						scope.doctor.search.Phone = option.value;
						break;
				}//end switch
				scope.doctor.load();
				loadPage(1);
			}

			scope.doctor = {
				search: search,
				error: '',
				count: 0,
				loading: false,
				list: [],
				load: function(){ load(); },
				loadPage: function(page){ loadPage(page); },
				sort: function(option){ sort(option); },
				onSearch: function(option){ onSearch(option); }
			}

			/* LOAD FIRST */
			scope.doctor.load();
			/* END LOAD FIRST */
		}
	}//end return
})