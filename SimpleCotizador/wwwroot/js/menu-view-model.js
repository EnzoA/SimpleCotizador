function MenuViewModel($http, $window, baseUrl) {
    this.$http = $http;
    this.$window = $window;
    this.baseUrl = baseUrl;
}

MenuViewModel.prototype = {
    salir: function () {
        var requerimiento = {
            method: 'POST',
            url: this.baseUrl + 'simplecotizadorapi/account/logout',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            }
        };

        var self = this;
        this.$http(requerimiento)
            .then(function successCallback(response) {
                self.$window.location.href = '/Account/Login';
            }, function errorCallback(response) {

            });
    }
};