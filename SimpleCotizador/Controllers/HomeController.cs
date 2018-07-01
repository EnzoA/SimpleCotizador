using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimpleCotizador.Models;
using System.Diagnostics;

namespace SimpleCotizador.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        public IActionResult Index(string usuario)
        {
            ViewBag.Usuario = usuario;
            return View();
        }
        
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
