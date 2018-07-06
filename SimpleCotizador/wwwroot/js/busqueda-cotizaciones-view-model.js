function BusquedaCotizacionesViewModel($http, baseUrl) {
    this.$http = $http;
    this.baseUrl = baseUrl;
    this.filtro = '';
    this.cotizaciones = [];
}

BusquedaCotizacionesViewModel.prototype = {
    buscarCotizaciones: function () {
        var requerimiento = {
            method: 'GET',
            url: this.baseUrl + 'simplecotizadorapi/cotizaciones?filtro=' + this.filtro,
            headers: {
                'Accepts': 'application/json'
            }
        };

        var self = this;
        this.$http(requerimiento)
            .then(function successCallback(response) {
                self.cotizaciones = response.data;
            }, function errorCallback(response) {

            });
    },
    procesarKeyPress: function (keyEvent) {
        if (keyEvent.keyCode === 13) {
            this.buscarCotizaciones();
        }
    }
};