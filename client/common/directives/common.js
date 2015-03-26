angular.module('app.directives.common', [])

.directive('ngEnter', function() {
	return function(scope, element, attrs) {
		element.bind("keydown keypress", function(event) {
			if(event.which === 13) {
				scope.$apply(function(){
					scope.$eval(attrs.ngEnter);
				});
			event.preventDefault();
			}
		});
	};
})

.directive('ngDatePicker', function(){
	return {
		restrict: 'A',
		require: '^ngModel',
		scope: {
			options: '=',
			ngModel: '='
		},
		link: function(scope, elem, attrs){
			var cal = new Pikaday({
				field: elem[0],
				format: 'DD/MM/YYYY'
			});
		}
	}//end return
})

.directive('ngNote', function($timeout){
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            text: '@',
            type: '@',
            preShow: '@',
            show: '='
        },
        template: '<a class="ui {{color}} tag label" ng-click="highlight(show)" style="display: none;">{{text}} <i class="icon close" ng-show="preShow" ng-click="close()"></i></a>',
        link: function(scope, elem, attrs){
            scope.color = 'teal';
            switch(scope.type){
                case 'success':
                    scope.color = 'teal';
                    break;
                case 'error':
                    scope.color = 'red';
                    break;
            }

            scope.close = function(){
                elem.css('display', 'none');
            }

            scope.highlight = function(show){                
                if(scope.preShow){
                    if(angular.element('#'+scope.preShow+'_'+show).length > 0){
                        angular.element('html, body').animate({
                            scrollTop: angular.element('#'+scope.preShow+'_'+show).offset().top,
                        }, 200);

                        angular.element('#'+scope.preShow+'_'+show).addClass('active');
                        $timeout(function(){
                            angular.element('#'+scope.preShow+'_'+show).removeClass('active');
                        }, 1000)
                    }
                }//end if
            }

            scope.$watch('show', function(show){
                if(!S(show).isEmpty()){
                    elem.css('display', 'inline-block');
                }
            })
        }
    }
})

.directive('ngDropdown', function(){
    return {
        restrict: 'A',
        link: function(scope, elem, attrs){
            elem.dropdown();
        }
    }
})

.directive('ngPagination', function($timeout){
	return {
		restrict: 'EA',
		require: '^ngModel',
		scope: {
			total: '=',
			row: '=',
			ngModel: '=',
			onChange: '&'
		},
		templateUrl: 'common/views/pagination.html',
		link: function(scope, elem, attrs){
			scope.$watch('total', function(total){
				if(!S(total).isEmpty()){
					var rows = Math.ceil(total/scope.row);
					scope.pagination = [];
					for(var i = 1; i <= rows; i++)
						scope.pagination.push(i);
					$timeout(function(){
						scope.data = scope.ngModel;
					}, 300)
				}
			})

			scope.$watch('data', function(data){
				if(!S(data).isEmpty()){
					scope.ngModel = scope.data;
				}
			})
		}
	}//end return
})

.filter('empty', function(){
	return function(input){
		return !S(input).isEmpty() ? input : '###'
	}
})

.filter('date', function(){
	return function(input, date){
		if(!moment(input).isValid()) return '###';
		if(S(input).isEmpty()) return '###';

		return moment(input).format(date);
	}
})

/* SERVICE DIALOG */
.factory("ModalService", function($document, $compile, $http, $controller, Restangular, $rootScope, $q, $timeout){
    var body = $document.find("body");

    function ModalService(){
        var self = this;

        var getTemplate = function(template, templateUrl){
            var deferred = $q.defer();
            if(template){
                deferred.resolve(template);
            }else if(templateUrl){
                var templateArray = templateUrl.split('/');

                if(templateArray.length <= 1){
                    var templateHtml = angular.element("#"+templateUrl).html();
                    deferred.resolve(templateHtml);
                }else{
                    $http({method: "GET", url: templateUrl})
                    .then(function(result){
                        deferred.resolve(result.data);
                    })
                }
            }

            return deferred.promise;
        }//end get template

        self.showModal = function(options){
            var deferred = $q.defer();

            var controllerName = options.controller;

            getTemplate(options.template, options.templateUrl).then(function(template){

                //Create a new scope for modal
                var modalScope = $rootScope.$new();
                if(options.resolve !== null)
                    modalScope.resolve = options.resolve;

                var closeDeferred = $q.defer();
                var inputs = {
                    $scope: modalScope,
                    close: function(result, delay){
                        if(delay === undefined || delay === null) delay = 0;
                        $timeout(function(){
                            closeDeferred.resolve(result);
                        }, delay)
                    }
                }//end inputs

                // If we have provided any inputs, pass them to the controller.
                if(options.inputs) {
                    for(var inputName in options.inputs) {
                        inputs[inputName] = options.inputs[inputName];
                    }
                }

                //Parse the modal HTML into a DOM element
                var modalElementTemplate = angular.element(template);

                var linkFn = $compile(modalElementTemplate);
                var modalElement = linkFn(modalScope);
                inputs.$element = modalElement;

                //Create the controller, explicitly specifying the scope to use.
                var modalController = $controller(controllerName, inputs);

                if(options.appendElement){
                    options.appendElement.append(modalElement);
                }else{
                    body.append(modalElement);

                    $timeout(function(){
                        modalElement.modal({
                            'closable': false,
                            'selector': {
                                close: '.closed'
                            },
                            'allowMultiple': true
                        });

                        angular.element(modalElement[0]).modal('show');
                    }, 400)
                }

                // We now have a modal object.
                var modal = {
                    controller: modalController,
                    scope: modalScope,
                    element: modalElement,
                    close: closeDeferred.promise
                };

                modal.close.then(function(result){
                    angular.element(modalElement[0]).modal('hide');
                    modalElement.remove();
                    modalScope.$destroy();
                })

                deferred.resolve(modal);

            })
            return deferred.promise;
            //GET THE ACTUAL HTML OF THE TEMPLATES
            //END GET THE ACTUAL HTML OF THE TEMPLATES
        }//end Show Modal
    }

    return new ModalService();
})
/* END SERVICE DIALOG */

/* ADDITIONAL FUNCTION */
.factory('CommonModel', function($filter){
    var mainModel = {};

    mainModel.convertToDate = function(date){
        if(!S(date).isEmpty()){
            return S(date).right(4).s + '-' + date.substring(3, 5) + '-' + S(date).left(2).s;
        }
        return null;
    }

    mainModel.convertToTime = function(time){
        if(!S(time).isEmpty()){
            return S(time).left(2).s+':'+S(time).right(2).s;
        }
        return '';
    }

    mainModel.beforeSave = function(errors){
        _.forEach(errors, function(error){
            angular.element('#'+error.field).removeClass('error');
            angular.element('#'+error.field+'_label').removeClass('visible');
                angular.element('#'+error.field+'_label').empty();
        })
    }

    mainModel.beforeError = function(errors){
        if(errors){
            _.forEach(errors, function(error){
                angular.element('#'+error.field).addClass('error');
                angular.element('#'+error.field+'_label').addClass('visible');
                angular.element('#'+error.field+'_label').append($filter('translate')(error.code)+'<br>');
            })
        }
    }

    mainModel.getMedicineUnit = function(){
        return [
            {id:"bottle", name:"bottle"},
            {id:"tablet", name:"tablet"},
            {id:"box", name:"box"},
            {id:"mg", name:"mg"},
        ]
    }

    return mainModel;
})
/* END ADDITIONAL FUNCTION */