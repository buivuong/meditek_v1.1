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
						var flagPatient = -1;
						var i = 0;
						_.forEach(scope.appointment.list, function(list){
							if(list.FROM_TIME === data.FROM_TIME){
								if(list.CAL_ID === data.CAL_ID){
									flagPatient = i;
									return;
								}else{
									flagTheme = true;
									return;
								}
							}
							i++;
						})

						if(flagTheme){

						}else if(flagPatient !== -1){
							var doctor_row = 0;
							_.forEach(response.doctors, function(doctor){
								if(doctor.DOCTOR_ID === data.DOCTOR_ID){
									scope.appointment.list[flagPatient].doctors[doctor_row].patients.push({Patient_id: data.Patient_id, First_name: data.First_name, Sur_name: data.Sur_name});
									scope.appointment.list[flagPatient].doctors[doctor_row].PATIENTS = 'ok';
								}
								doctor_row++;
							})
						}else{
							var doctors = [];
							_.forEach(response.doctors, function(doctor){
								if(doctor.DOCTOR_ID === data.DOCTOR_ID)
									doctors.push({DOCTOR_ID: doctor.DOCTOR_ID, DOCTOR_NAME: doctor.NAME, SERVICE_ID: data.SERVICE_ID, CAL_ID: data.CAL_ID, PATIENTS: 'MESS_SYS_010', patients: [] });
								else
									doctors.push({DOCTOR_ID: doctor.DOCTOR_ID, DOCTOR_NAME: doctor.NAME, PATIENTS: '###'});
							})

							var object = {FROM_TIME: data.FROM_TIME, TO_TIME: data.TO_TIME, CAL_ID: data.CAL_ID, doctors: doctors};
							scope.appointment.list.push(object);
						}
					}) // end forEach

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