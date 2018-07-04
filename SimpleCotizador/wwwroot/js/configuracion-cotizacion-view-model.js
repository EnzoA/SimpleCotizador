function ConfiguracionCotizacionViewModel(nuevaCotizacionState) {
    this.nuevaCotizacionState = nuevaCotizacionState;
    this.nombreCliente = nuevaCotizacionState.nombreCliente;
    this.tipoSeguro = nuevaCotizacionState.tipoSeguro;
    this.fechaVencimiento = new Date();
    this.fechaVencimiento.setFullYear(this.fechaVencimiento.getFullYear() + 1);

    var self = this;

    this.navegarAConfirmacionCotizacion = function () {
        self.nuevaCotizacionState.nombreCliente = self.nombreCliente;
        self.nuevaCotizacionState.tipoSeguro = self.tipoSeguro;
        self.nuevaCotizacionState.fechaVencimiento = self.fechaVencimiento;
    };
}