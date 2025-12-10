using Application.Interfaces;
using Application.Wrappers;
using Domain.Entities;
using MediatR;

namespace Application.Features.Tipos_contribuyente.Commands
{
    public class DeleteTipos_contribuyenteCommand : IRequest<Response<int>>
    {
        public int Id { get; set; }
    }

    public class DeleteTipos_contribuyenteCommandHandler : IRequestHandler<DeleteTipos_contribuyenteCommand, Response<int>>
    {
        private readonly IRepositoryAsync<tipos_contribuyente> _repositoryAsync;

        public DeleteTipos_contribuyenteCommandHandler(IRepositoryAsync<tipos_contribuyente> repositoryAsync)
        {
            _repositoryAsync = repositoryAsync;
        }

        public async Task<Response<int>> Handle(DeleteTipos_contribuyenteCommand request, CancellationToken cancellationToken)
        {
            var tiposContribuyente = await _repositoryAsync.GetByIdAsync(request.Id);

            if (tiposContribuyente == null)
            {
                throw new KeyNotFoundException($"Registro no encontrado con el id {request.Id}");
            }
            else
            {
                await _repositoryAsync.DeleteAsync(tiposContribuyente);

                return new Response<int>(tiposContribuyente.Id);
            }
        }
    }
}
