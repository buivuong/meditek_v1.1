angular.module('app.loggedIn.allergy.directives.listPatient', [])

.directive('listPatient', function(AllergyModel, ModalService, $filter,$state,$stateParams){
	return {
		restrict: 'EA',
		templateUrl: 'modules/allergy/directives/templates/listPatient.html',
		scope: {
			options: '='
		},
		link: function(scope, elem, attrs){
			var search = {
				page: 1,
				offset: 0,
				limit: 20,
				First_name: '',
				Sur_name:'',
				Title:'',
				Sex:'',
				State :'',
				Creation_date: 'desc'
			}

			var load = function(){
				scope.patient.loading = true;
				AllergyModel.idAllergy({allergy_id:$stateParams.allergyId}).then(function(response){
					console.log(response);
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
				scope.patient.search.DOB = option.by;
				scope.patient.load();
			}

			var loadPage = function(page){
				scope.patient.search.offset = (page-1)*scope.patient.search.limit;
				scope.patient.load();
			}

			var choosePatient = function(){
				ModalService.showModal({
     				templateUrl: 'modules/allergy/dialogs/templates/listPatient.html',
					controller: 'AllergyDialogListPatientController'
    			})
    			.then(function(modal){
    				modal.close.then(function(result){
    					if(result) {
    						scope.patient.load();
    					}
    				});
    			})
			}
			
			scope.patient = {
				dialog: {
					choosePatient: function(){ choosePatient(); }
				},
				search: search,
				error: '',
				count: 0,
				loading: false,
				list: [],
				load: function(){ load(); },
				loadPage: function(page){ loadPage(page); },
				onSearch: function(option){ onSearch(option)},
				sort: function(option){ sort(option) },
				choosePatient :function(){choosePatient()}
			}

			/* LOAD FIRST */
			scope.patient.load();
			/* END LOAD FIRST */
		}//end link
	}//end return
})