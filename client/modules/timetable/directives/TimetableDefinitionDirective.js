angular.module('app.loggedIn.timetable.directives.definition', [])

.directive('timetableDefinition', function(TimetableModel, AppointmentModel, ModalService, localStorageService, $stateParams, $filter){
	return {
		restrict: 'EA',
		templateUrl: 'modules/timetable/directives/templates/definition.html',
		scope: {
			options: '='
		},
		link: function(scope, elem, attrs){
			var load = function(){
				scope.timetable.loading = true;
				TimetableModel.list({doctor_id: $stateParams.doctorId}).then(function(response){
					scope.timetable.list = response.data;
					scope.timetable.error = '';
					scope.timetable.loading = false;

					var i = 0;
					_.forEach(scope.timetable.list, function(row){
						scope.timetable.list[i].from_t = moment(row.from_time).format('HH:mm');
						scope.timetable.list[i].to_t = moment(row.to_time).format('HH:mm');
						i++;
					})
				}, function(error){
					scope.timetable.loading = false;
					scope.timetable.error = $filter('translate')(error.data.code);
				})
			}

			var loadAppointment = function(){
				AppointmentModel.byDoctor({doctor_id: $stateParams.doctorId}).then(function(response){
					scope.timetable.current.from_time = moment(response.data.FROM_TIME).format('DD/MM/YYYY');
					scope.timetable.current.to_time = moment(response.data.TO_TIME).format('DD/MM/YYYY');
				}, function(error){})
			}

			/* DIALOG */
			var addDay = function(){
				ModalService.showModal({
					resolve: {options: scope.options},
     				templateUrl: 'timetableAddDialog',
     				controller: function($scope, close){
     					var beforeSave = function(errors){
     						_.forEach(errors, function(error){
								angular.element('#'+error.field).removeClass('error');
								angular.element('#'+error.field+'_label').removeClass('visible');
     							angular.element('#'+error.field+'_label').empty();
							})
     					}

     					var beforeSaveError = function(errors){
     						if(errors){
	     						_.forEach(errors, function(error){
									angular.element('#'+error.field).addClass('error');
									angular.element('#'+error.field+'_label').addClass('visible');
									angular.element('#'+error.field+'_label').append($filter('translate')(error.code)+'<br>');
								})
							}     					
						}

     					var save = function(){
							beforeSave($scope.timetable.form.errors);

     						var postData = angular.copy($scope.timetable.form);
     						postData.Created_by = postData.Last_updated_by = localStorageService.get('user').id;
     						postData.Creation_date = postData.Last_update_date = moment().format('YYYY-MM-DD hh:mm:ss');
     						postData.doctor_id = $stateParams.doctorId;
     						if(!S(postData.from_time).isEmpty())
     							postData.from_time = moment().format('YYYY-MM-DD').toString()+' '+S(postData.from_time).left(2).s+':'+S(postData.from_time).right(2).s;
     						if(!S(postData.to_time).isEmpty())
     							postData.to_time = moment().format('YYYY-MM-DD').toString()+' '+S(postData.to_time).left(2).s+':'+S(postData.to_time).right(2).s;

     						TimetableModel.add(postData).then(function(response){

     						}, function(error){
     							$scope.timetable.form.errors = angular.copy(error.data.errors);
     							beforeSaveError($scope.timetable.form.errors);
     						})
     					}

     					$scope.timetable = {
     						options: {
								DAY_OF_WEEK: $scope.resolve.options.DAY_OF_WEEK,
								services: $scope.resolve.options.services
							},
							form: {
								day_of_Week: '',
								SERVICE_ID: null,
								from_time: null,
								to_time: null,
								description: '',
								errors: []
							},
							save: function(){ save(); }
     					}

     					$scope.close = function(){
     						close("saassa", 200);
     					}
     				}
    			}).then(function(modal){
    				modal.close.then(function(result){
    					console.log(result);
    				});
    			})
			}
			/* END DIALOG */

			scope.timetable = {
				current: {
					from_time: null,
					to_time: null
				},
				dialog: {
					addDay: function(){ addDay(); }
				},
				search: {
					from: moment().format('DD/MM/YYYY'),
					to: moment().add(1, 'years').format('DD/MM/YYYY')
				},
				list: [],
				error: '',
				loading: false,
				load: function(){ load(); }
			}//end timetable

			scope.appointment = {
				load: function(){ loadAppointment(); }
			}

			//Load First
			scope.timetable.load();
			scope.appointment.load();
		}
	}//end return
})