function MenuViewModel($http, $window) {
    this.$http = $http;
    this.$window = $window;
}

MenuViewModel.prototype = {
    salir: function () {
        var self = this;
        var requerimiento = {
            method: 'POST',
            url: 'http://localhost:62283/simplecotizadorapi/account/logout',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            }
        };
        this.$http(requerimiento)
            .then(function successCallback(response) {
                self.$window.location.href = '/Account/Login';
            }, function errorCallback(response) {

            });
    }
};