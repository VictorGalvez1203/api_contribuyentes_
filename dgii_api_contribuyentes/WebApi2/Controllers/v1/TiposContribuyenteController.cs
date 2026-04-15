using Application.Features.Tipos_contribuyente.Commands;
using Application.Features.Tipos_contribuyente.Queries;
using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi2.Controllers.v1
{
    [Authorize]
    [ApiVersion("1.0")]
    public class TiposContribuyenteController : BaseApiController
    {
        //Get: api/<controllers>/5
        [Authorize(Roles = "admin, basic")]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await Mediator.Send(new GetTipos_contribuyenteByIdQuery { Id = id }));
        }

        //Get: api/<controllers>/
        [Authorize(Roles = "admin, basic")]
        [HttpGet()]
        public async Task<IActionResult> Get([FromQuery] GetAllTipos_contribuyenteQuery filter)
        {
            return Ok(await Mediator.Send(new GetAllTipos_contribuyenteQuery
            {
                PageNumber = filter.PageNumber,
                PageSize = filter.PageSize,
            }));
        }

        //Post api/<controller>
        [Authorize(Roles = "admin")]
        [HttpPost]
        public async Task<IActionResult> Post(CreateTipos_contribuyenteCommand command)
        {
            return Ok(await Mediator.Send(command));
        }

        //Put: api/<controllers>/5
        [Authorize(Roles = "admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, UpdateTipos_contribuyenteCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest();
            }
            else
            {
                return Ok(await Mediator.Send(command));
            }
        }

        //Delete: api/<controllers>/5
        [Authorize(Roles = "admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await Mediator.Send(new DeleteTipos_contribuyenteCommand { Id = id }));
        }
    }
}
