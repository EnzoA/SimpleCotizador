using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SimpleCotizador.DTOs;
using SimpleCotizador.Models;

namespace SimpleCotizador.Controllers
{
    [Produces("application/json")]
    public class AccountApiController : ControllerBase
    {
        #region Campos privados

        private SignInManager<SimpleCotizadorUser> _signInManager;

        private UserManager<SimpleCotizadorUser> _userManager;

        #endregion

        #region Constructores

        public AccountApiController(SignInManager<SimpleCotizadorUser> signInManager, UserManager<SimpleCotizadorUser> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        #endregion

        #region Métodos públicos

        [HttpPost]
        [Route("SimpleCotizadorApi/Account/Login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginRequest loginRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            else
            {
                await _signInManager.SignOutAsync();
                Microsoft.AspNetCore.Identity.SignInResult result = await _signInManager.PasswordSignInAsync(loginRequest.Usuario,
                                                                                                             loginRequest.Contrasenia,
                                                                                                             isPersistent: false,
                                                                                                             lockoutOnFailure: false);

                if (result.Succeeded)
                {
                    SimpleCotizadorUser usuario = await _userManager.FindByNameAsync(loginRequest.Usuario);
                    return Ok(new Dictionary<string, string> { { "Usuario", usuario.UserName } });
                }
                else
                {
                    return BadRequest("Usuario o contraseña inválidos.");
                }
            }
        }

        [HttpPost]
        [Route("SimpleCotizadorApi/Account/Logout")]
        public async Task<IActionResult> LogoutAsync()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }

        #endregion
    }
}