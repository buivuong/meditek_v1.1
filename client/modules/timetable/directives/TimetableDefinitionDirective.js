angular.module('app.loggedIn.timetable.directives.definition', [])

.directive('timetableDefinition', function(TimetableModel, DoctorModel, CommonModel, ModalService, localStorageService, $stateParams, $timeout, $state, $filter){
	return {
		restrict: 'EA',
		templateUrl: 'modules/timetable/directives/templates/definition.html',
		scope: {
			options: '='
		},
		link: function(scope, elem, attrs){
			var loadDoctor = function(){
				DoctorModel.byId({doctor_id: $stateParams.doctorId})
				.then(function(response){
					scope.doctor.item = response.data;
				}, function(error){})
			}

			var loadSite = function(){
				TimetableModel.siteList({doctor_id: $stateParams.doctorId})
				.then(function(response){
					var i = 0;
					_.forEach(scope.timetable.list, function(timetable_row){
						scope.timetable.list[i].site = [];
						_.forEach(response.data, function(site_row){
							if(site_row.cal_header_df_id === timetable_row.cal_header_df_id)
								scope.timetable.list[i].site.push(site_row);
						})
						i++;
					})
				}, function(error){})
			}

			var load = function(){
				scope.timetable.loading = true;
				TimetableModel.list({doctor_id: $stateParams.doctorId}).then(function(response){
					scope.timetable.list = response.data;

					/* LOAD SITE */
					scope.site.load();
					/* END LOAD SITE */
					scope.timetable.loading = false;
				}, function(error){
					scope.timetable.loading = false;
				})
			}

			/* DIALOG */
			var addDay = function(){
				ModalService.showModal({
					resolve: {options: scope.options},
     				templateUrl: 'modules/timetable/dialogs/templates/add.html',
     				controller: 'TimetableDialogAddController'
    			}).then(function(modal){
    				modal.close.then(function(result){
    					if(result) {
    						scope.timetable.load();
    						scope.timetable.notify.add = result;
    					}
    				});
    			})
			}

			var editDay = function(id){
				ModalService.showModal({
					resolve: {options: scope.options, id: id},
     				templateUrl: 'modules/timetable/dialogs/templates/edit.html',
     				controller: 'TimetableDialogEditController'
    			}).then(function(modal){
    				modal.close.then(function(result){
    					if(result) {
    						scope.timetable.load();
    						scope.timetable.notify.edit = result;
    					}
    				});
    			})
			}

			var removeDay = function(row){
				ModalService.showModal({
					resolve: {id: row},
					templateUrl: 'common/views/remove.html',
					controller: function($scope, close){
						$scope.close = function(params){
							close(params);
						}
					}
				}).then(function(modal){
					modal.close.then(function(result){
						if(result){
							TimetableModel.remove(result).then(function(deleted){
								scope.timetable.load();
								scope.timetable.notify.remove = deleted.data;
							}, function(error){});
						}
					})
				})
			}

			var addSite = function(row){
				ModalService.showModal({
					resolve: {options: scope.options, doctor: scope.doctor.item, timetable: row},
     				templateUrl: 'modules/timetable/dialogs/templates/addSite.html',
     				controller: 'TimetableDialogAddSiteController'
    			}).then(function(modal){
    				modal.close.then(function(result){
    					if(result) {
    						scope.timetable.load();
    						scope.site.notify.add = result;
    					}
    				});
    			})
			}

			var editSite = function(row, id){
				ModalService.showModal({
					resolve: {options: scope.options, doctor: scope.doctor.item, timetable: row, id: id},
     				templateUrl: 'modules/timetable/dialogs/templates/editSite.html',
     				controller: 'TimetableDialogEditSiteController'
    			}).then(function(modal){
    				modal.close.then(function(result){
    					if(result) {
    						scope.timetable.load();
    						scope.site.notify.edit = result;
    					}
    				});
    			})
			}

			var removeSite = function(id){
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
							TimetableModel.siteRemove({id: result}).then(function(deleted){
								scope.timetable.load();
							}, function(error){});
						}
					})
				})
			}

			var openTimetable = function(row){
				row.clinical_dept_id = scope.doctor.item.CLINICAL_DEPT_ID;
				ModalService.showModal({
					resolve: {row: row},
					templateUrl: 'notifyToSaveTimetable',
					controller: function($scope, close){
						$scope.close = function(params){
							close(params);
						}
					}
				}).then(function(modal){
					modal.close.then(function(result){
						if(result){
							scope.timetable.dialog.createTimetable(result);
						}
					})
				})
			}

			var createTimetable = function(row){
				var postData = angular.copy(row);

				postData.day_of_Week_code = null;

				switch(postData.day_of_Week){
					case 'Monday':
						postData.day_of_Week_code = 1;
						break;
					case 'Tuesday':
						postData.day_of_Week_code = 2;
						break;
					case 'Wednesday':
						postData.day_of_Week_code = 3;
						break;
					case 'Thursday':
						postData.day_of_Week_code = 4;
						break;
					case 'Friday':
						postData.day_of_Week_code = 5;
						break;
					case 'Saturday':
						postData.day_of_Week_code = 6;
						break;
				}

				postData.clinical_dept_id = scope.doctor.item.CLINICAL_DEPT_ID;
				postData.Appt_interval = scope.doctor.item.Appt_interval;

				TimetableModel.createTimetable(postData)
				.then(function(response){
					scope.timetable.notify.save = response.data;
				}, function(error){
					scope.timetable.error.location = $filter('translate')(error.data.code);
				})
			}
			/* END DIALOG */

			scope.doctor = {
				load: function(){ loadDoctor(); },
				item: null
			}

			scope.site = {
				notify: {
					add: null,
					edit: null,
					remove: null
				},
				dialog: {
					addSite: function(id){ addSite(id); },
					editSite: function(row, id){ editSite(row, id); },
					removeSite: function(id){ removeSite(id); }
				},
				load: function(){ loadSite(); }
			}

			scope.timetable = {
				notify: {
					add: null,
					edit: null,
					remove: null,
					save: null
				},
				dialog: {
					addDay: function(){ addDay(); },
					editDay: function(id){ editDay(id); },
					removeDay: function(row){ removeDay(row); },
					openTimetable: function(row){ openTimetable(row); },
					createTimetable: function(row){ createTimetable(row); }
				},
				search: {
					from: moment().format('DD/MM/YYYY'),
					to: moment().add(1, 'years').format('DD/MM/YYYY')
				},
				list: [],
				error: {
					location: ''
				},
				loading: false,
				load: function(){ load(); }
			}//end timetable

			//Load First
			scope.timetable.load();
			scope.doctor.load();
		}
	}//end return
})