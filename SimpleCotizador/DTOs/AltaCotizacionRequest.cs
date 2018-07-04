using System;
using System.ComponentModel.DataAnnotations;

namespace SimpleCotizador.DTOs
{
    public class AltaCotizacionRequest
    {
        [Required]
        [DataType(DataType.Text)]
        public string NombreCliente { get; set; }

        [Required]
        [DataType(DataType.Text)]
        public string TipoSeguro { get; set; }

        [Required]
        [DataType(DataType.Text)]
        public string FormaPago { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime FechaVencimiento { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime FechaCotizacion { get; set; }

        [Required]
        public bool Activa { get; set; }

        [Required]
        [DataType(DataType.Text)]
        public string NumeroPoliza { get; set; }
    }
}
