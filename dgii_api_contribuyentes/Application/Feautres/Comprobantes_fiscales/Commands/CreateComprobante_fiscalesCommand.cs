using Application.Wrappers;
using MediatR;

namespace Application.Feautres.Comprobantes_fiscales.Commands
{
    public class CreateComprobante_fiscalesCommand : IRequest<Wrappers.Response<int>>
    {
        public string Ncf { get; set; }
        public DateTime Fecha_Emision { get; set; }
        public decimal Monto { get; set; }
        public decimal Itbis18 {  get; set; }
        public string Descripcion { get; set; }
    }

    public class Createomprobante_fiscalesCommandHandler : IRequestHandler<CreateComprobante_fiscalesCommand, Response<int>>
    {
        public async Task<Response<int>> Handle(CreateComprobante_fiscalesCommand request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
