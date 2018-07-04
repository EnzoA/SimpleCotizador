function ConfirmacionCotizacionViewModel($http, nuevaCotizacionState) {
    this.$http = $http;
    this.nuevaCotizacionState = nuevaCotizacionState;
    this.esPolizaActiva = true;
    var hoy = new Date();
    var offset = hoy.getTimezoneOffset();
    this.fechaCotizacion = new Date(hoy.valueOf() + offset * 60000);
    this.formaPago = null;

    var self = this;

    this.cotizar = function () {
        var requerimiento = {
            method: 'POST',
            url: 'http://localhost:62283/simplecotizadorapi/cotizaciones',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            data: {
                'nombreCliente': self.nuevaCotizacionState.nombreCliente,
                'tipoSeguro': self.nuevaCotizacionState.tipoSeguro,
                'formaPago': self.formaPago,
                'fechaVencimiento': self.nuevaCotizacionState.fechaVencimiento,
                'fechaCotizacion': self.fechaCotizacion,
                'activa': self.esPolizaActiva
            };
        };
        self.$http(requerimiento)
            .then(function successCallback(response) {
                
            }, function errorCallback(response) {
                
            });
    };
}