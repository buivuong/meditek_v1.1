angular.module('app', [
	'ui.router',
	'ngMessages',
	'restangular',
	'pascalprecht.translate',
	'LocalStorageModule',
	'ui.utils',

	'app.loggedIn',
	'app.security',
	'app.directives.common'
])

.config(function($stateProvider, $httpProvider, $urlRouterProvider, $translateProvider, RestangularProvider){
	// JWT SIGN
	$httpProvider.interceptors.push(function($q, $location, localStorageService) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                if (localStorageService.get('user')) {
                    config.headers.Authorization = 'Bearer ' + localStorageService.get('user').token;
                }
                return config;
            },
            'responseError': function(response) {
                if(response.status === 401 || response.status === 403) {
                    $location.path('/login');
                }
                return $q.reject(response);
            }
        };
    });
	// END JWT SIGN

	// ANGULAR TRANSLATE
    $translateProvider.useStaticFilesLoader({
        prefix: '/manh/test/client/languages/',
        suffix: ".json"
    });

    $translateProvider.preferredLanguage("en");
    // END ANGULAR TRANSLATE

	//For any unmatched url, redirect to /init
	$urlRouterProvider.otherwise('/');

	RestangularProvider.setBaseUrl('http://localhost:3001/api/meditek/v1/');

	$stateProvider
		.state('init', {
			url: '/',
			resolve: {
				init: function($state, $timeout){
					$timeout(function(){
						$state.go('login');
					}, 100)
				}
			}
		})
})