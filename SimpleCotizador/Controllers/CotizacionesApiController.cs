using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimpleCotizador.Persistency;
using System.Linq;

namespace SimpleCotizador.Controllers
{
    [Authorize]
    [Produces("application/json")]
    public class CotizacionesApiController : ControllerBase
    {
        private SimpleCotizadorDbContext _simpleCotizadorDbContext;

        public CotizacionesApiController(SimpleCotizadorDbContext simpleCotizadorDbContext)
        {
            _simpleCotizadorDbContext = simpleCotizadorDbContext;
        }

        [HttpGet]
        [Route("SimpleCotizadorApi/Cotizaciones")]
        public IActionResult GetCotizaciones(string filtro)
        {
            var cotizaciones = _simpleCotizadorDbContext.Cotizaciones
                                                        .Where(c => string.IsNullOrEmpty(filtro) ||
                                                                    c.NombreCliente.StartsWith(filtro) ||
                                                                    c.NumeroPoliza.StartsWith(filtro))
                                                        .OrderBy(c => c.NumeroPoliza)
                                                        .ToList();

            return Ok(cotizaciones);
        }
    }
}