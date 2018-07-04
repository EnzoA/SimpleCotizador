function BusquedaCotizacionesViewModel($http) {
    this.$http = $http;
    this.filtro = '';
    this.cotizaciones = [];
}

BusquedaCotizacionesViewModel.prototype = {
    buscarCotizaciones: function () {
        var self = this;

        var requerimiento = {
            method: 'GET',
            url: 'http://localhost:62283/simplecotizadorapi/cotizaciones?filtro=' + this.filtro,
            headers: {
                'Accepts': 'application/json'
            }
        };

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