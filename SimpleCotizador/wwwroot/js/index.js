"use strict";
+function () {
    angular
        .module('indexApp', ['ngRoute', 'smart-table', '720kb.datepicker'])
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/Index/BusquedaCotizaciones', { templateUrl: '/html/BusquedaCotizaciones.html', controller: 'busquedaCotizacionesController' })
                .when('/Index/ConfiguracionCotizacion', { templateUrl: '/html/ConfiguracionCotizacion.html', controller: 'configuracionCotizacionController' })
                .when('/Index/ConfirmacionCotizacion', { templateUrl: '/html/ConfirmacionCotizacion.html', controller: 'confirmacionCotizacionController' })
                .otherwise({ redirectTo: '/Index/BusquedaCotizaciones' });
            $locationProvider.html5Mode(true);
        }])
        .controller('menuController', ['$scope', '$http', '$window', 'baseUrl', function ($scope, $http, $window, baseUrl) {
            $scope.vm = new MenuViewModel($http, $window, baseUrl);
        }])
        .controller('busquedaCotizacionesController', ['$scope', '$http', 'baseUrl', function ($scope, $http, baseUrl) {
            $scope.vm = new BusquedaCotizacionesViewModel($http, baseUrl);
        }])
        .controller('configuracionCotizacionController', ['$scope', 'nuevaCotizacionState', function ($scope, nuevaCotizacionState) {
            $scope.vm = new ConfiguracionCotizacionViewModel(nuevaCotizacionState);
        }])
        .controller('confirmacionCotizacionController', ['$scope', '$http', '$window', 'nuevaCotizacionState', 'baseUrl', function ($scope, $http, $window, nuevaCotizacionState, baseUrl) {
            $scope.vm = new ConfirmacionCotizacionViewModel($http, $window, nuevaCotizacionState, baseUrl);
        }])
        .service('nuevaCotizacionState', function () {
            this.nombreCliente = '';
            this.tipoSeguro = '';
            this.fechaVencimiento = null;
            this.fechaCotizacion = null;
            this.formaPago = null;
            this.numeroPoliza = '';
            this.esPolizaActiva = true;
        })
        .factory('baseUrl', ['$window', '$location', function ($window, $location) {
            var absoluteUrl = $location.absUrl();
            if (absoluteUrl) {
                return new $window.URL(absoluteUrl).origin + '/';
            } else {
                return window.location.href;
            }
        }]);
}();