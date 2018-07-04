"use strict";
+function () {
    angular
        .module('loginApp', [])
        .controller('loginController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
            $scope.vm = new LoginViewModel($http, $window);
        }]);

    function LoginViewModel($http, $window) {
        this.$http = $http;
        this.$window = $window;
        this.usuario = '';
        this.contrasenia = '';
        this.enProgreso = false;
        this.error = false;
        this.mensajeError = '';
    }

    LoginViewModel.prototype = {
        login: function () {
            this.error = false;
            this.mensajeError = '';
            this.enProgreso = true;
            var self = this;

            var requerimiento = {
                method: 'POST',
                url: 'http://localhost:62283/simplecotizadorapi/account/login',
                headers: {
                    'Content-Type': 'application/json',
                    'Accepts': 'application/json'
                },
                data: {
                    'usuario': this.usuario,
                    'contrasenia': this.contrasenia
                }
            };
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