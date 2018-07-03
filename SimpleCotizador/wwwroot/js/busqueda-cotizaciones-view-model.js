function BusquedaCotizacionesViewModel($http) {
    this.$http = $http;
    this.filtro = '';
    this.cotizaciones = [];

    var self = this;

    this.buscarCotizaciones = function () {
        var requerimiento = {
            method: 'GET',
            url: 'http://localhost:62283/simplecotizadorapi/cotizaciones?filtro=' + self.filtro,
            headers: {
                'Accepts': 'application/json'
            }
        };

        self.$http(requerimiento)
            .then(function successCallback(response) {
                self.cotizaciones = response.data;
            }, function errorCallback(response) {
                
            });
    };

    this.procesarKeyPress = function (keyEvent) {
        if (keyEvent.keyCode === 13) {
            self.buscarCotizaciones();
        }
    };
}