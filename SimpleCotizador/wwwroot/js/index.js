﻿"use strict";
+function () {
    angular
        .module('indexApp', ['ngRoute', 'smart-table'])
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/BusquedaCotizaciones', { templateUrl: '/html/BusquedaCotizaciones.html', controller: 'busquedaCotizacionesController' })
                .when('/ConfiguracionCotizacion', { templateUrl: '/html/ConfiguracionCotizacion.html', controller: 'configuracionCotizacionController' })
                .otherwise({ redirectTo: '/BusquedaCotizaciones' });
            $locationProvider.html5Mode(true);
        }])
        .controller('menuController', ['$scope', '$http', function ($scope, $http, $window) {
            $scope.vm = new MenuViewModel($http);
        }])
        .controller('busquedaCotizacionesController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
            $scope.vm = new BusquedaCotizacionesViewModel($http, $window);
            $scope.mensaje = 'Busqueda de cotizaciones';
        }])
        .controller('configuracionCotizacionController', ['$scope', function ($scope) {
            $scope.mensaje = 'Configuracion de cotizacion'
        }]);
}();