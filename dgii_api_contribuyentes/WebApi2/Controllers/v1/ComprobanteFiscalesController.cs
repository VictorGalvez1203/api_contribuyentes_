using Application.Features.Comprobantes_fiscales.Commands;
using Application.Features.Comprobantes_fiscales.Queries;
using Application.Feautres.Comprobantes_fiscales.Queries;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;

namespace WebApi2.Controllers.v1
{
    [ApiVersion("1.0")]
    public class ComprobanteFiscalesController : BaseApiController
    {
        //Get: api/<controllers>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await Mediator.Send(new GetComprobantes_fiscalesByIdQuery { Id = id}));
        }

        //Get: api/<controllers>/
        [HttpGet()]
        public async Task<IActionResult> Get([FromQuery] GetAllComprobanteFiscalParameters filter)
        {
            return Ok(await Mediator.Send(new GetAllComprobantes_fiscalesQuery 
            {
                PageNumber = filter.PageNumber, 
                PageSize = filter.PageSize, 
                ContribuyenteId = filter.ContribuyenteId, 
                Ncf = filter.Ncf,
                FechaEmision = filter.FechaEmision
            }));
        }
        
        //Post: api/<controller>
        [HttpPost]
        public async Task<IActionResult> Post(CreateComprobante_fiscalesCommand command)
        {
            return Ok(await Mediator.Send(command));
        }

        //Put: api/<controllers>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, UpdateComprobante_fiscalesCommand command)
        {
            if(id != command.Id)
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
            return Ok(await Mediator.Send(new DeleteComprobante_fiscalesCommand { Id = id }));
        }
    }
}
