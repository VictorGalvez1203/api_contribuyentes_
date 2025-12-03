using Application.Features.Comprobantes_fiscales.Commands;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;

namespace WebApi2.Controllers.v1
{
    [ApiVersion("1.0")]
    public class ComprobanteFiscalesController : BaseApiController
    {
        //Post api/<controller>
        [HttpPost]
        public async Task<IActionResult> Post(CreateComprobante_fiscalesCommand command)
        {
            return Ok(await Mediator.Send(command));
        }
    }
}
