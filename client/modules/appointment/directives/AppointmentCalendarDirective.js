angular.module('app.loggedIn.appointment.directives.calendar', [])

.directive('appointmentCalendar', function(ModalService, SiteModel, ClinicalDeptModel, AppointmentModel, CommonModel){
	return {
		restrict: 'EA',
		templateUrl: 'modules/appointment/directives/templates/calendar.html',
		link: function(scope, elem, attrs){
			var search = {
				datepicker: moment().format('DD/MM/YYYY'),
				site_id: 1,
				clinical_dept_id: ''
			}

			var loadSite = function(){
				SiteModel.listAll()
				.then(function(response){
					scope.site.list = response.data;
				}, function(error){})
			}

			var loadClinical = function(){
				ClinicalDeptModel.listAll()
				.then(function(response){
					scope.clinicalDept.list = response.data;
				}, function(error){})
			}

			var load = function(){
				var postData = angular.copy(scope.appointment.search);
				postData.datepicker = CommonModel.convertToDate(postData.datepicker);

				scope.appointment.list = [];

				AppointmentModel.load(postData)
				.then(function(response){
					scope.doctor.headers = response.doctors;

					_.forEach(response.data, function(data){
						var flagTheme = false;
						var flagPatient = false;
						_.forEach(scope.appointment.list, function(list){
							if(list.FROM_TIME === data.FROM_TIME){
								if(list.CAL_ID === data.CAL_ID){
									flagPatient = true;
								}else{
									flagTheme = true;
								}
							}
						})

						if(flagTheme){

						}else{
							var doctors = [];
							_.forEach(response.doctors, function(doctor){
								if(doctor.DOCTOR_ID === data.DOCTOR_ID)
									doctors.push({DOCTOR_ID: doctor.DOCTOR_ID, DOCTOR_NAME: doctor.NAME, SERVICE_ID: data.SERVICE_ID, CAL_ID: data.CAL_ID, PATIENTS: 'MESS_SYS_010'});
								else
									doctors.push({DOCTOR_ID: doctor.DOCTOR_ID, DOCTOR_NAME: doctor.NAME, PATIENTS: '###'});
							})

							var object = {FROM_TIME: data.FROM_TIME, TO_TIME: data.TO_TIME, doctors: doctors};
							scope.appointment.list.push(object);
						}
					})

				}, function(error){})
			}

			var dialogAdd = function(app, col){
				ModalService.showModal({
					resolve: {app: app, col: col},
     				templateUrl: 'appointmentAdd',
     				controller: function($scope, close){

     				}
    			}).then(function(modal){
    				modal.close.then(function(result){
    					if(result) {
    						scope.timetable.load();
    						scope.timetable.notify.edit = result;
    					}
    				});
    			})
			}

			scope.appointment = {
				dialog: {
					add: function(app, col){ dialogAdd(app, col) }
				},
				list: [],
				search: search,
				load: function(){ load(); }
			}

			scope.site = {
				list: [],
				load: function(){ loadSite(); }
			}

			scope.doctor = {
				headers: []
			}

			scope.clinicalDept = {
				list: [],
				load: function(){ loadClinical(); }
			}

			//INIT
			scope.site.load();
			scope.clinicalDept.load();
			scope.appointment.load();
		}
	}//end return
})