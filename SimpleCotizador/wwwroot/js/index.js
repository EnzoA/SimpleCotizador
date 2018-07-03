"use strict";
+function () {
    angular
        .module('indexApp', ['ngRoute', 'smart-table'])
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/BusquedaCotizaciones', { templateUrl: '/html/BusquedaCotizaciones.html', controller: 'busquedaCotizacionesController' })
                .when('/ConfiguracionCotizacion', { templateUrl: '/html/ConfiguracionCotizacion.html', controller: 'configuracionCotizacionController' })
                .when('/ConfirmacionCotizacion', { templateUrl: '/html/ConfirmacionCotizacion.html', controller: 'confirmacionCotizacionController' })
                .otherwise({ redirectTo: '/BusquedaCotizaciones' });
            $locationProvider.html5Mode(true);
        }])
        .controller('menuController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
            $scope.vm = new MenuViewModel($http, $window);
        }])
        .controller('busquedaCotizacionesController', ['$scope', '$http', function ($scope, $http) {
            $scope.vm = new BusquedaCotizacionesViewModel($http);
        }])
        .controller('configuracionCotizacionController', ['$scope', function ($scope) {
            $scope.vm = new ConfiguracionCotizacionViewModel();
        }])
        .controller('confirmacionCotizacionController', ['$scope', function ($scope) {
            $scope.vm = new ConfirmacionCotizacionViewModel();
        }]);
}();