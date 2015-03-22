angular.module('app.loggedIn.timetable.dialog.editSite', [])

.controller('TimetableDialogEditSiteController', function($scope, localStorageService, close, $stateParams, CommonModel, SiteModel, TimetableModel, $filter){
	var options = angular.copy($scope.resolve.options);
	options.weeks = [
		{code: 1, value: 'Week 1'},
		{code: 2, value: 'Week 2'},
		{code: 3, value: 'Week 3'},
		{code: 4, value: 'Week 4'}
	];

	var save = function(){
		CommonModel.beforeSave($scope.site.errors);

		var postData = angular.copy($scope.site.form);
		postData.Last_updated_by = localStorageService.get('user').id;
		postData.Last_update_date = moment().format('YYYY-MM-DD hh:mm:ss');
		postData.doctor_id = $stateParams.doctorId;
		postData.cal_header_df_id = $scope.resolve.timetable.cal_header_df_id;

		postData.isenable = 1;

		TimetableModel.siteUpdate(postData).then(function(response){
			$scope.site.close(response.data);
		}, function(error){
			$scope.site.errors = angular.copy(error.data.errors);
			CommonModel.beforeError($scope.site.errors);
		})
	}

	var load = function(id){
		TimetableModel.siteOne({id: id})
		.then(function(response){
			$scope.site.form = angular.copy(response.data);
		}, function(error){})
	}

	$scope.site = {
		options: options,
		load: function(id){
			load(id);
		},
		close: function(params){
			close(params);
		},
		form: {
			cal_header_df_id: null,
			week_ord_of_month: null,
			site_id: null,
			description: ''
		},
		errors: [],
		save: function(){
			save();
		}
	}//end site

	var loadOptions = function(){
		SiteModel.listByDept({clinical_dept_id: $scope.resolve.doctor.CLINICAL_DEPT_ID})
		.then(function(response){
			options.sites = response.data;
		}, function(error){})
	}

	loadOptions();
	$scope.site.load($scope.resolve.id);
})