function ConfirmacionCotizacionViewModel($http, $window, nuevaCotizacionState, baseUrl) {
    this.$http = $http;
    this.$window = $window;
    this.nuevaCotizacionState = nuevaCotizacionState;
    this.baseUrl = baseUrl;
    this.fechaCotizacion = nuevaCotizacionState.fechaCotizacion ? nuevaCotizacionState.fechaCotizacion : this.obtenerFechaUTC0();
    this.formaPago = nuevaCotizacionState.formaPago ? nuevaCotizacionState.formaPago : null;
    this.numeroPoliza = nuevaCotizacionState.numeroPoliza ? nuevaCotizacionState.numeroPoliza : this.generarGUID();
    this.esPolizaActiva = nuevaCotizacionState.esPolizaActiva;
    this.error = false;

    var self = this;
    $(".modal").on('hide.bs.modal', function () {
        self.$window.location.href = 'Index/BusquedaCotizaciones';
    });
}

ConfirmacionCotizacionViewModel.prototype = {
    cotizar: function () {
        this.error = false;
        var requerimiento = {
            method: 'POST',
            url: this.baseUrl + 'simplecotizadorapi/cotizaciones',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            data: {
                'nombreCliente': this.nuevaCotizacionState.nombreCliente,
                'tipoSeguro': this.nuevaCotizacionState.tipoSeguro,
                'formaPago': this.formaPago,
                'fechaVencimiento': this.nuevaCotizacionState.fechaVencimiento,
                'fechaCotizacion': this.obtenerFechaCotizacion(),
                'activa': this.esPolizaActiva,
                'numeroPoliza': this.numeroPoliza
            }
        };

        var self = this;
        this.$http(requerimiento)
            .then(function successCallback(response) {
                $('.modal').modal({});
            }, function errorCallback(response) {
                self.error = true;
            });
    },
    obtenerFechaUTC0: function () {
        var hoy = new Date();
        var offset = hoy.getTimezoneOffset();
        return new Date(hoy.valueOf() + offset * 60000);
    },
    obtenerFechaCotizacion: function () {
        var elementosFechaCotizacion = $('.angular-datepicker-input').val().split('/');
        return new Date(elementosFechaCotizacion[1] + '-' + elementosFechaCotizacion[0] + '-' + elementosFechaCotizacion[2]);
    },
    generarGUID: function () {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
    },
    navegarAConfiguracionCotizacion: function () {
        this.nuevaCotizacionState.fechaCotizacion = this.obtenerFechaCotizacion();
        this.nuevaCotizacionState.formaPago = this.formaPago;
        this.nuevaCotizacionState.numeroPoliza = this.numeroPoliza;
        this.nuevaCotizacionState.esPolizaActiva = this.esPolizaActiva;
    }
};