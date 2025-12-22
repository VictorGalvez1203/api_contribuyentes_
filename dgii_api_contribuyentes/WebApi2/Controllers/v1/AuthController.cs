using Application.Feautres.Auth.Commands;
using Application.Feautres.Auth.Commands.Register;
using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi2.Controllers.v1
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class AuthController : BaseApiController
    {
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginCommand command)
        {
            var result = await Mediator.Send(command);

            if (!result.Succeeded)
            {
                return BadRequest(result); // 400
            }

            return Ok(result); // 200
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterCommand command)
        {
            var result = await Mediator.Send(command);

            if (!result.Succeeded)
            {
                // Error lógico → correo duplicado
                if (!string.IsNullOrEmpty(result.Message))
                {
                    return Conflict(result); // 409
                }

                // Errores de validación
                return BadRequest(result); // 400
            }

            // Todo OK
            return Ok(result); // 200
        }
    }
}
