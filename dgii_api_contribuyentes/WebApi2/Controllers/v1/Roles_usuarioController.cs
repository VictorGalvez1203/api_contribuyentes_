using Application.Features.Roles_usuario.Commands;
using Application.Features.Roles_usuario.Queries;
using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi2.Controllers.v1
{
    [Authorize]
    [ApiVersion("1.0")]
    public class Roles_usuarioController : BaseApiController
    {
        //Get: api/<controllers>/5
        [Authorize(Roles = "admin, basic")]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await Mediator.Send(new GetRoles_usuarioByIdQuery { Id = id }));
        }

        //Get: api/<controllers>/
        [Authorize(Roles = "admin, basic")]
        [HttpGet()]
        public async Task<IActionResult> Get([FromQuery] GetAllRoles_usuarioQuery filter)
        {
            return Ok(await Mediator.Send(new GetAllRoles_usuarioQuery
            {
                PageNumber = filter.PageNumber,
                PageSize = filter.PageSize,
            }));
        }

        //Post api/<controller>s
        [Authorize(Roles = "admin")]
        [HttpPost]
        public async Task<IActionResult> Post(CreateRoles_usuarioCommand command)
        {
            return Ok(await Mediator.Send(command));
        }

        //Put: api/<controllers>/5
        [Authorize(Roles = "admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, UpdateRoles_usuarioCommand command)
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
            return Ok(await Mediator.Send(new DeleteRoles_usuarioCommand { Id = id }));
        }
    }
}
