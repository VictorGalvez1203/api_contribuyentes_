using Application.Interfaces;
using Application.Wrappers;
using MediatR;

namespace Application.Features.Comprobantes_fiscales.Commands
{
    public class UpdateComprobante_fiscalesCommand : IRequest<Response<int>>
    {
        public int Id { get; set; }
        public int ContribuyenteId { get; set; }
        public string? Ncf { get; set; }
        public decimal Monto { get; set; }
        public string? Descripcion { get; set; }
    }

    public class UpdateComprobante_fiscalesCommandHandler : IRequestHandler<UpdateComprobante_fiscalesCommand, Response<int>>
    {
        private readonly IRepositoryAsync<Domain.Entities.Comprobantes_fiscales> _repositoryAsync;

        public UpdateComprobante_fiscalesCommandHandler(IRepositoryAsync<Domain.Entities.Comprobantes_fiscales> repositoryAsync)
        {
            _repositoryAsync = repositoryAsync;
        }
        public async Task<Response<int>> Handle(UpdateComprobante_fiscalesCommand request, CancellationToken cancellationToken)
        {
            var Comprobante_fiscales = await _repositoryAsync.GetByIdAsync(request.Id);

            if (Comprobante_fiscales == null)
            {
                throw new KeyNotFoundException($"Registro no encontrado con el id {request.Id}");
            }
            else
            {
                Comprobante_fiscales.ContribuyenteId = request.ContribuyenteId;
                Comprobante_fiscales.Ncf = request.Ncf;
                Comprobante_fiscales.Monto = request.Monto;
                Comprobante_fiscales.Descripcion = request.Descripcion;

                await _repositoryAsync.UpdateAsync(Comprobante_fiscales);

                return new Response<int>(Comprobante_fiscales.Id);
            }
        }
    }
}
