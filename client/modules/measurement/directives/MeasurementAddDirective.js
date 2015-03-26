angular.module('app.loggedIn.measurement.directives.add', [])

.directive('addMeasurement', function(MeasurementModel, ModalService, $filter,$state,CommonModel,localStorageService  ){
	return {
		restrict: 'EA',
		templateUrl: 'modules/measurement/directives/templates/add.html',
		scope: {
			options: '='
		},
		link: function(scope, elem, attrs)
		{
			var form = {
				  patient_id: '',
				  measurement_date: '',
				  BP1: '',
				  BP2: '',
				  RATE: '',
				  Height: '',
				  Weight: '',
				  Waist: '',
				  Hips: '',
				  Neck: '',
				  head_circ: '',
				  FEV1: '',
				  FVC: '',
				  Gas_transfer: '',
				  Cholesterol: '',
				  Triglycerides: '',
				  HDL: '',
				  LDL: '',
				  BSL: '',
				  HbA1c: '',
				  Microalbuminuria: '',
				  Potassium: '',
				  PSA: '',
				  Creatitine: '',
				  ACR: '',
				  GFR: '',
				  isMDRD: '',
				  isCockcroft_fault: '',
				  right_pressure: '',
				  left_pressure: '',
				  right_uncorrected: '',
				  left_uncorrected: '',
				  right_corrected: '',
				  left_corrected: '',
				  cal_id: ''

				}

			var save = function(){
		    	var postData = angular.copy(scope.measurement.form);
		    	console.log(postData);
		    	postData.Created_by = postData.Last_updated_by = localStorageService.get('user').id;
    			postData.Creation_date = postData.Last_update_date = moment().format('YYYY-MM-DD hh:mm:ss');
		  		MeasurementModel.add(postData)
		  			.then(function(response){

		  			}, function(error){

		  			})
		    }

		    var patientClick = function(){
			ModalService.showModal({
				templateUrl: 'patientModal',
				controller: function($scope, close){
					angular.element('#measurementModal').removeClass('active');
					angular.element('#measurementModal').removeClass('visible');

					$scope.clickRow = function(row){
						close(row);
						angular.element('#measurementModal').addClass('active');
						angular.element('#measurementModal').addClass('visible');
					}

					$scope.close = function(params){
						close(params);
						angular.element('#measurementModal').addClass('active');
						angular.element('#measurementModal').addClass('visible');
					}

				}
			})
			.then(function(modal){
				modal.close.then(function(result){
					if(result) {
						scope.measurement.form.patient_id = result.Patient_id;
						scope.measurement.Patient_name = result.First_name+result.Sur_name;
					}
				});
			})
			}
		    scope.measurement = {
		    	form:form,
		    	Patient_name:'',
		    	save :function(){save();}
		    }

		    scope.patient = {
			click: function(){ patientClick(); }
	}
		}
		
	}//end return
})