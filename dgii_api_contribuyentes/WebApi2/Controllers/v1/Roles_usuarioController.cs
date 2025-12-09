using Application.Features.Contribuyentes.Commands;
using Application.Features.Roles_usuario.Commands;
using Microsoft.AspNetCore.Mvc;

namespace WebApi2.Controllers.v1
{
    public class Roles_usuarioController : BaseApiController
    {
        //Post api/<controller>
        [HttpPost]
        public async Task<IActionResult> Post(CreateRoles_usuarioCommand command)
        {
            return Ok(await Mediator.Send(command));
        }

        //Put: api/<controllers>/5
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
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await Mediator.Send(new DeleteRoles_usuarioCommand { Id = id }));
        }
    }
}
