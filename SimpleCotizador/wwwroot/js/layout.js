"use strict";
+function () {
    angular.module('menuApp', [])
           .controller('menuController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
               $scope.vm = new MenuViewModel($http, $window);
           }]);

    function MenuViewModel($http, $window) {
        this.$http = $http;
        this.$window = $window;

        var self = this;

        this.salir = function () {
            var requerimiento = {
                method: 'POST',
                url: 'http://localhost:62283/simplecotizadorapi/account/logout',
                headers: {
                    'Content-Type': 'application/json',
                    'Accepts': 'application/json'
                }
            };
            self.$http(requerimiento)
                .then(function successCallback(response) {
                    self.$window.location.href = '/Account/Login';
                }, function errorCallback(response) {
                    
                });
        }
    }
}();