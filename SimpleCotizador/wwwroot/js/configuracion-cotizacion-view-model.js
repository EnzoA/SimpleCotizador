function ConfiguracionCotizacionViewModel(nuevaCotizacionState) {
    this.nuevaCotizacionState = nuevaCotizacionState;
    this.nombreCliente = nuevaCotizacionState.nombreCliente;
    this.tipoSeguro = nuevaCotizacionState.tipoSeguro;
    this.fechaVencimiento = new Date();
    this.fechaVencimiento.setFullYear(this.fechaVencimiento.getFullYear() + 1);
}

ConfiguracionCotizacionViewModel.prototype = {
    navegarAConfirmacionCotizacion: function () {
        this.nuevaCotizacionState.nombreCliente = this.nombreCliente;
        this.nuevaCotizacionState.tipoSeguro = this.tipoSeguro;
        this.nuevaCotizacionState.fechaVencimiento = this.fechaVencimiento;
    }
};