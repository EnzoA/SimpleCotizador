using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimpleCotizador.DTOs;
using SimpleCotizador.Models;
using SimpleCotizador.Persistency;
using System;
using System.Linq;
using System.Threading.Tasks;

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
        public IActionResult GetCotizaciones(string filtro, bool mostrarInactivas = false)
        {
            var cotizaciones = _simpleCotizadorDbContext.Cotizaciones
                                                        .Where(c => (mostrarInactivas || c.Activa) &&
                                                                    string.IsNullOrEmpty(filtro) ||
                                                                    c.NombreCliente.StartsWith(filtro) ||
                                                                    c.NumeroPoliza.StartsWith(filtro))
                                                        .OrderBy(c => c.NumeroPoliza)
                                                        .ToList();

            return Ok(cotizaciones);
        }

        [HttpPost]
        [Route("SimpleCotizadorApi/Cotizaciones")]
        public async Task<IActionResult> AltaCotizacionAsync([FromBody] AltaCotizacionRequest altaCotizacionRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            else
            {
                var cotizacion = await _simpleCotizadorDbContext.Cotizaciones.AddAsync(new Cotizacion
                {
                    NombreCliente = altaCotizacionRequest.NombreCliente,
                    TipoSeguro = altaCotizacionRequest.TipoSeguro,
                    FormaPago = altaCotizacionRequest.FormaPago,
                    FechaVencimiento = altaCotizacionRequest.FechaVencimiento,
                    FechaCotizacion = altaCotizacionRequest.FechaCotizacion,
                    Activa = altaCotizacionRequest.Activa,
                    NumeroPoliza = altaCotizacionRequest.NumeroPoliza
                });

                await _simpleCotizadorDbContext.SaveChangesAsync();

                return Ok();
            }
        }
    }
}