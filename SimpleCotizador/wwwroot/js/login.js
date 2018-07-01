"use strict";
+function () {
    angular.module('loginApp', [])
        .controller('loginController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
            $scope.vm = new LoginViewModel($http, $window);
        }]);

    function LoginViewModel($http, $window) {
        this.$http = $http;
        this.$window = $window;
        this.usuario = '';
        this.contrasenia = '';

        var self = this;
        this.login = function () {
            var requerimiento = {
                method: 'POST',
                url: 'http://localhost:62283/simplecotizadorapi/account/login',
                headers: {
                    'Content-Type': 'application/json',
                    'Accepts': 'application/json'
                },
                data: {
                    'usuario': self.usuario,
                    'contrasenia': self.contrasenia
                }
            };
            self.$http(requerimiento)
                .then(function successCallback(response) {
                    self.$window.location.href = '/Home/Index';
                }, function errorCallback(response) {
                    alert('Error: ' + response.status);
                });
        };
    }
}();