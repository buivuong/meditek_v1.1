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
.factory("ModalService", function($document, $compile, $controller, $http, $rootScope, $q, $timeout){
    var body = $document.find("body");

    function ModalService(){
        var self = this;

        var getTemplate = function(template, templateUrl){
            var deferred = $q.defer();
            if(template){
                deferred.resolve(template);
            }else if(templateUrl){
                var templateHtml = angular.element("#"+templateUrl).html();
                if(typeof templateHtml === "undefined"){
                    $http({method: "GET", url: templateUrl})
                    .then(function(result){
                        deferred.resolve(result.data);
                    })
                }else{
                    deferred.resolve(templateHtml);
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
                    modalElement.modal({
                        'closable': false,
                        'selector': {
                            close: '.closed'
                        }
                    });

                    modalElement.modal('show');
                }

                // We now have a modal object.
                var modal = {
                    controller: modalController,
                    scope: modalScope,
                    element: modalElement,
                    close: closeDeferred.promise
                };

                modal.close.then(function(result){
                    angular.element(modalElement[0]).closeModal();
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