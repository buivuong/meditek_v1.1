angular.module('app.loggedIn.timetable.directives.definition', [])

.directive('timetableDefinition', function(TimetableModel, ModalService, $stateParams, $filter){
	return {
		restrict: 'EA',
		templateUrl: 'modules/timetable/directives/templates/definition.html',
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

			var addDay = function(){
				ModalService.showModal({
     				templateUrl: "userAddDialog",
     				controller: function($scope, close){
     				}
    			}).then(function(modal){

    			})
			}

			scope.timetable = {
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

			//Load First
			scope.timetable.load();
		}
	}//end return
})