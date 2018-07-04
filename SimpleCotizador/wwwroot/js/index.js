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
        .controller('configuracionCotizacionController', ['$scope', 'nuevaCotizacionState', function ($scope, nuevaCotizacionState) {
            $scope.vm = new ConfiguracionCotizacionViewModel(nuevaCotizacionState);
        }])
        .controller('confirmacionCotizacionController', ['$scope', '$http', 'nuevaCotizacionState', function ($scope, $http, nuevaCotizacionState) {
            $scope.vm = new ConfirmacionCotizacionViewModel($http, nuevaCotizacionState);
        }])
        .factory('nuevaCotizacionState', function () {
            return {
                nombreCliente: '',
                tipoSeguro: '',
                fechaVencimiento: null,
                fechaCotizacion: null,
                formaPago: null,
                numeroPoliza: '',
                esPolizaActiva: true
            };
        });
}();