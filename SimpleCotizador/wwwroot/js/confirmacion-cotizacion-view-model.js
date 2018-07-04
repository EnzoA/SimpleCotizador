function ConfirmacionCotizacionViewModel($http, nuevaCotizacionState) {
    this.$http = $http;
    this.nuevaCotizacionState = nuevaCotizacionState;
    this.esPolizaActiva = true;
    this.fechaCotizacion = this.obtenerFechaUTC0();
    this.formaPago = null;
    this.numeroPoliza = this.generarGUID();
}

ConfirmacionCotizacionViewModel.prototype = {
    cotizar: function () {
        var requerimiento = {
            method: 'POST',
            url: 'http://localhost:62283/simplecotizadorapi/cotizaciones',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            data: {
                'nombreCliente': this.nuevaCotizacionState.nombreCliente,
                'tipoSeguro': this.nuevaCotizacionState.tipoSeguro,
                'formaPago': this.formaPago,
                'fechaVencimiento': this.nuevaCotizacionState.fechaVencimiento,
                'fechaCotizacion': this.fechaCotizacion,
                'activa': this.esPolizaActiva,
                'numeroPoliza': this.numeroPoliza
            }
        };
        this.$http(requerimiento)
            .then(function successCallback(response) {
                alert('Alta exitosa!');
            }, function errorCallback(response) {
                alert('Error!');
            });
    },
    obtenerFechaUTC0: function () {
        var hoy = new Date();
        var offset = hoy.getTimezoneOffset();
        return new Date(hoy.valueOf() + offset * 60000);
    },
    generarGUID: function () {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
    }
};