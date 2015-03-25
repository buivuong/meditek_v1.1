angular.module('app.loggedIn.appointment.directives.calendar', [])

.directive('appointmentCalendar', function(SiteModel, ClinicalDeptModel){
	return {
		restrict: 'EA',
		templateUrl: 'modules/appointment/directives/templates/calendar.html',
		link: function(scope, elem, attrs){
			var search = {
				datepicker: moment().format('DD/MM/YYYY'),
				site_id: 1,
				clinical_dept_id: 1
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

			scope.appointment = {
				search: search
			}

			scope.site = {
				list: [],
				load: function(){ loadSite(); }
			}

			scope.clinicalDept = {
				list: [],
				load: function(){ loadClinical(); }
			}

			//INIT
			scope.site.load();
			scope.clinicalDept.load();
		}
	}//end return
})