using Application.Features.Contribuyentes.Commands;
using Application.Features.Contribuyentes.Queries;
using Application.Feautres.Contribuyentes.Queries;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;

namespace WebApi2.Controllers.v1
{
    [ApiVersion("1.0")]
    public class ContribuyentesController : BaseApiController
    {
        //Get: api/<controllers>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await Mediator.Send(new GetContribuyenteByIdQuery { Id = id }));
        }

        //Get: api/<controllers>/
        [HttpGet()]
        public async Task<IActionResult> Get([FromQuery] GetAllContribuyenteParameters filter)
        {
            return Ok(await Mediator.Send(new GetAllContribuyenteQuery
            {
                PageNumber = filter.PageNumber,
                PageSize = filter.PageSize,
                FistName = filter.FistName,
                LastName = filter.LastName,
                RncCedula = filter.RncCedula,
                TipoContribuyenteId = filter.TipoContribuyenteId,
                Status = filter.Status,

            }));
        }

        //Post api/<controller>
        [HttpPost]
        public async Task<IActionResult> Post(CreateContribuyenteCommand command)
        {
            return Ok(await Mediator.Send(command));
        }

        //Put: api/<controllers>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, UpdateContribuyenteCommand command)
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
            return Ok(await Mediator.Send(new DeleteContribuyenteCommand { Id = id }));
        }
    }
}
    