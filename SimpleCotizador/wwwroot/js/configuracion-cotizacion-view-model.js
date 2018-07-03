function ConfiguracionCotizacionViewModel() {
    this.nombreCliente = '';
    this.tipoSeguro = '';
    this.fechaVencimiento = new Date();
    this.fechaVencimiento.setFullYear(this.fechaVencimiento.getFullYear() + 1);
}