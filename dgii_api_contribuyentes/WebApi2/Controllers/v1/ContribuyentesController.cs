using Application.Features.Comprobantes_fiscales.Commands;
using Application.Features.Contribuyentes.Commands;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;

namespace WebApi2.Controllers.v1
{
    [ApiVersion("1.0")]
    public class ContribuyentesController : BaseApiController
    {
        //Post api/<controller>
        [HttpPost]
        public async Task<IActionResult> Post(CreateContribuyenteCommand command)
        {
            return Ok(await Mediator.Send(command));
        }
    }
}
    