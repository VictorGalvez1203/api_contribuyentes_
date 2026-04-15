using Application.Interfaces;
using Application.Wrappers;
using MediatR;

namespace Application.Features.Comprobantes_fiscales.Commands
{
    public class DeleteComprobante_fiscalesCommand : IRequest<Response<int>>
    {
        public int Id { get; set; }
    }

    public class DeleteComprobante_fiscalesCommandHandler : IRequestHandler<DeleteComprobante_fiscalesCommand, Response<int>>
    {
        private readonly IRepositoryAsync<Domain.Entities.Comprobantes_fiscales> _repositoryAsync;

        public DeleteComprobante_fiscalesCommandHandler(IRepositoryAsync<Domain.Entities.Comprobantes_fiscales> repositoryAsync)
        {
            _repositoryAsync = repositoryAsync;
        }

        public async Task<Response<int>> Handle(DeleteComprobante_fiscalesCommand request, CancellationToken cancellationToken)
        {
            var record = await _repositoryAsync.GetByIdAsync(request.Id);

            if (record == null)
            {
                throw new KeyNotFoundException($"Registro no encontrado con el id {request.Id}");
            }
            else
            {
                await _repositoryAsync.DeleteAsync(record);

                return new Response<int>(record.Id);
            }
        }
    }

}
