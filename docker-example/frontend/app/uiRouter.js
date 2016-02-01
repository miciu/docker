/*global angular */
angular.module('aws-app').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('addItem', {
                url: '/item',
                templateUrl: 'app/item/template.html',
                controller: 'itemController',
                controllerAs: 'vm'
            })
            .state('home', {
                url: '/',
                templateUrl: 'app/home.html',
            });
    }]);

