using System;

namespace SimpleCotizador.Models
{
    public class Cotizacion
    {
        public int Id { get; set; }

        public string NombreCliente { get; set; }

        public string TipoSeguro { get; set; }

        public string FormaPago { get; set; }

        public DateTime FechaVencimiento { get; set; }

        public DateTime FechaCotizacion { get; set; }

        public bool Activa { get; set; }

        public string NumeroPoliza { get; set; }
    }
}
