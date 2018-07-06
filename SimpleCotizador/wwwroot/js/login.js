"use strict";
+function () {
    angular
        .module('loginApp', [])
        .controller('loginController', ['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {
            var baseUrl = new $window.URL($location.absUrl()).origin + '/';
            $scope.vm = new LoginViewModel($http, $window, baseUrl);
        }]);

    function LoginViewModel($http, $window, baseUrl) {
        this.$http = $http;
        this.$window = $window;
        this.baseUrl = baseUrl;
        this.usuario = '';
        this.contrasenia = '';
        this.recordarme = false;
        this.enProgreso = false;
        this.error = false;
        this.mensajeError = '';
    }

    LoginViewModel.prototype = {
        login: function () {
            this.error = false;
            this.mensajeError = '';
            this.enProgreso = true;

            var requerimiento = {
                method: 'POST',
                url: this.baseUrl + 'simplecotizadorapi/account/login',
                headers: {
                    'Content-Type': 'application/json',
                    'Accepts': 'application/json'
                },
                data: {
                    'usuario': this.usuario,
                    'contrasenia': this.contrasenia,
                    'recordarme': this.recordarme
                }
            };

            var self = this;
            this.$http(requerimiento)
                .then(function successCallback(response) {
                    self.$window.location.href = '/Home/Index';
                }, function errorCallback(response) {
                    self.error = true;
                    self.enProgreso = false;
                    self.usuario = '';
                    self.contrasenia = '';
                    if (response.status === 400) {
                        self.mensajeError = 'Usuario o contraseña inválidos';
                    } else {
                        self.mensajeError = 'Ha ocurrido un error';
                    }
                });
        },
        textChange: function () {
            this.error = false;
        }
    };
}();