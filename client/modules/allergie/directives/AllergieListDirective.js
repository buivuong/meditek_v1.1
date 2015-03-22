angular.module('app.loggedIn.allergie.directives.list',[])

.directive('allergieList',function(AllergieModel,$filter){
	return{
		restrict: 'EA',
		templateUrl: 'modules/allergie/directives/templates/list.html',
		scope: {
			onRowClick: '&',
		},
		link: function(scope, elem, attrs){
			var search = {
				page: 1,
				offset: 0,
				limit: 10,
				allergie_name: '',
				Creation_date: 'desc'
			}

			var allergie_form = {
				isEnable:1
			}

			var isEditMode = false; 

			var load = function(){
				scope.allergie.loading = true;
				console.log('this is search', search);
				AllergieModel.list(search).then(function(response){
					scope.allergie.loading = false;
					scope.allergie.error = '';
					scope.allergie.list = response.data;
					scope.allergie.count = response.count;
				}, function(error){
					scope.allergie.loading = false;
					scope.allergie.error = $filter('translate')(error.data.code);
				})
			};

			var loadPage = function(page){
				scope.allergie.search.offset = (page-1)*scope.allergie.search.limit;
				scope.allergie.load();
			}

			var sort = function(option){
				scope.allergie.search.Creation_date = option.by;
				scope.allergie.load();
			}

			var onSearch = function(option){
				switch(option.field){
					case 'allergie_name':
						scope.allergie.search.allergie_name = option.value;
						break;
				}//end switch
				scope.allergie.load();
			}

			var insert = function(){
				var postData = scope.allergie.allergie_form;
				postData.Creation_date = moment().format('YYYY-MM-DD hh:mm:ss');
				scope.allergie.loading = true;
				AllergieModel.add(scope.allergie.allergie_form).then(function(response){
					scope.allergie.loading = false;
					scope.allergie.error = '';
					scope.allergie.load();
				}, function(error){
					scope.allergie.loading = false;
					scope.allergie.error = $filter('translate')(error.data.code);
				})
			}

			var formLoad = function(row){
				var postData = {allergie_id: row.allergie_id};
				AllergieModel.byid(postData).then(function(response){
					scope.allergie.isEditMode = true;
					scope.allergie.allergie_form = response.data;
				}, function(error){
					scope.allergie.loading = false;
					scope.allergie.error = $filter('translate')(error.data.code);
				})
			}

			var edit = function(){
				var postData = scope.allergie.allergie_form;
				AllergieModel.edit(postData).then(function(response){
					scope.allergie.cancelEdit();
					scope.allergie.load();
				}, function(error){
					scope.allergie.loading = false;
					scope.allergie.error = $filter('translate')(error.data.code);
				})
			}

			var cancelEdit = function(){
				scope.allergie.allergie_form = {
					isEnable: 1
				};
				scope.allergie.isEditMode = false;
			}

			// var byid = function(){
			// 	var postData = scope
			// }


			scope.allergie = {
				allergie_form: allergie_form,
				search: search,
				error: '',
				count: 0,
				loading: false,
				list: [],
				isEditMode:false,
				load: function(){ load(); },
				loadPage: function(page){ loadPage(page); },
				sort: function(option){ sort(option); },
				onSearch: function(option){ onSearch(option); },
				insert: function(){ insert(); },
				formLoad: function(row){ formLoad(row); },
				cancelEdit: function() { cancelEdit(); },
				edit: function() { edit(); }
			}

			/* LOAD FIRST */
			scope.allergie.load();
			/* END LOAD FIRST */
		}
	}
});