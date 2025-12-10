using Application.Features.Usuarios.Commands;
using Application.Features.Usuarios.Queries;
using Application.Feautres.Usuarios.Queries;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;

namespace WebApi2.Controllers.v1
{
    [ApiVersion("1.0")]
    public class UsuariosController : BaseApiController
    {
        //Get: api/<controllers>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await Mediator.Send(new GetUsuariosByIdQuery { Id = id }));
        }

        //Get: api/<controllers>/
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
        [HttpPost]
        public async Task<IActionResult> Post(CreateUsuariosCommand command)
        {
            return Ok(await Mediator.Send(command));
        }

        //Put: api/<controllers>/5
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
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await Mediator.Send(new DeleteUsuariosCommand { Id = id }));
        }
    }
}
