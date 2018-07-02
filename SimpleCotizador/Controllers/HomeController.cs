using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SimpleCotizador.Models;
using System.Diagnostics;
using System.Threading.Tasks;

namespace SimpleCotizador.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private SignInManager<SimpleCotizadorUser> _signInManager;

        public HomeController(SignInManager<SimpleCotizadorUser> signInManager)
        {
            _signInManager = signInManager;
        }

        public async Task<IActionResult> Index()
        {
            SimpleCotizadorUser usuario = await _signInManager.UserManager.GetUserAsync(_signInManager.Context.User);
            ViewBag.Usuario = usuario.UserName;
            return View();
        }
        
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
