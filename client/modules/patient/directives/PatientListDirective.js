angular.module('app.loggedIn.patient.directives.list', [])

.directive('patientList', function(PatientModel, ModalService, $filter){
	return {
		restrict: 'EA',
		templateUrl: 'modules/patient/directives/templates/list.html',
		scope: {
			options: '=',
			limit: '@'
		},
		link: function(scope, elem, attrs){
			if(S(scope.limit).isEmpty())
			{
				scope.limit = 20;
			}

			var search = {
				page: 1,
				offset: 0,
				limit: parseInt(scope.limit),
				First_name: '',
				Sur_name:'',
				Title:'',
				Sex:'',
				State :'',
				Creation_date: 'desc',
				DOB : 'desc'
			}

			var load = function(){
				scope.patient.loading = true;
				PatientModel.list(search).then(function(response){
					scope.patient.loading = false;
					scope.patient.error = '';
					scope.patient.list = response.data;
					scope.patient.count = response.count;
					scope.patient.search.page = 1;
				}, function(error){
					scope.patient.loading = false;
					scope.patient.error = $filter('translate')(error.data.code);
				})
			}

			var onSearch = function(option){
				switch(option.field){
					case 'First_name':
						scope.patient.search.First_name = option.value;
						break;
					case 'Sur_name':
						scope.patient.search.Sur_name = option.value;
						break;
					case 'Title':
						scope.patient.search.Title = option.value;
						break;
					case 'Sex':
						scope.patient.search.Sex = option.value;
						break;
					case 'State':
						scope.patient.search.State = option.value;
						break;
				}//end switch
				scope.patient.load();
				loadPage(1);
			}
			var sort = function(option){

				scope.patient.search.Creation_date = option.by;
				scope.patient.load();
				switch(option.by){
					case 'Creation_date':
						scope.patient.search.Creation_date = option.by;
						break;
					case 'DOB':
						scope.patient.search.DOB = option.value;
						break;
				}//end switch
				scope.patient.load();
			}

			var loadPage = function(page){
				scope.patient.search.offset = (page-1)*scope.patient.search.limit;
				scope.patient.load();
			}

			
			scope.patient = {
				search: search,
				error: '',
				count: 0,
				loading: false,
				list: [],
				load: function(){ load(); },
				loadPage: function(page){ loadPage(page); },
				onSearch: function(option){ onSearch(option)},
				sort: function(option){ sort(option) }
				// sortDOB: function(option){ sortDOB(option) }
			}

			/* LOAD FIRST */
			scope.patient.load();
			/* END LOAD FIRST */
		}//end link
	}//end return
})