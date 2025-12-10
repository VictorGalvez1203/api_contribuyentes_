using Application.Features.Tipos_contribuyente.Commands;
using Application.Features.Tipos_contribuyente.Queries;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;

namespace WebApi2.Controllers.v1
{
    [ApiVersion("1.0")]
    public class TiposContribuyenteController : BaseApiController
    {
        //Get: api/<controllers>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await Mediator.Send(new GetTipos_contribuyenteByIdQuery { Id = id }));
        }

        //Get: api/<controllers>/
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
        [HttpPost]
        public async Task<IActionResult> Post(CreateTipos_contribuyenteCommand command)
        {
            return Ok(await Mediator.Send(command));
        }

        //Put: api/<controllers>/5
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
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await Mediator.Send(new DeleteTipos_contribuyenteCommand { Id = id }));
        }
    }
}
