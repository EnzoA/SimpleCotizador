using System.ComponentModel.DataAnnotations;

namespace SimpleCotizador.DTOs
{
    public class LoginRequest
    {
        [Required]
        [DataType(DataType.Text)]
        public string Usuario { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Contrasenia { get; set; }
    }
}
