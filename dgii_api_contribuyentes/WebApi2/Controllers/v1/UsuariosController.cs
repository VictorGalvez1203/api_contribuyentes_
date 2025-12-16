using Application.Features.Usuarios.Commands;
using Application.Features.Usuarios.Queries;
using Application.Feautres.Usuarios.Queries;
using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi2.Controllers.v1
{
    [Authorize]
    [ApiVersion("1.0")]
    public class UsuariosController : BaseApiController
    {
        //Get: api/<controllers>/5
        [Authorize(Roles = "admin, basic")]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await Mediator.Send(new GetUsuariosByIdQuery { Id = id }));
        }

        //Get: api/<controllers>/
        [Authorize(Roles = "admin, basic")]
        [HttpGet()]
        public async Task<IActionResult> Get([FromQuery] GetAllUsuariosParameters filter)
        {
            return Ok(await Mediator.Send(new GetAllUsuariosQuery
            {
                PageNumber = filter.PageNumber,
                PageSize = filter.PageSize,
                Username = filter.Username,
                Rol_Id = filter.Rol_Id,
                Estado = filter.Estado
            }));
        }

        //Post api/<controller>
        [Authorize(Roles = "admin")]
        [HttpPost]
        public async Task<IActionResult> Post(CreateUsuariosCommand command)
        {
            return Ok(await Mediator.Send(command));
        }

        //Put: api/<controllers>/5
        [Authorize(Roles = "admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, UpdateUsuariosCommand command)
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
            return Ok(await Mediator.Send(new DeleteUsuariosCommand { Id = id }));
        }
    }
}
