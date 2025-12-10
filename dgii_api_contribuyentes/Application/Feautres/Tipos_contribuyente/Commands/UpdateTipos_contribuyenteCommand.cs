
using Application.Interfaces;
using Application.Wrappers;
using Domain.Entities;
using MediatR;

namespace Application.Features.Tipos_contribuyente.Commands
{
    public class UpdateTipos_contribuyenteCommand : IRequest<Response<int>>
    {
        public int Id { get; set; }
        public string? Tipo { get; set; }
    }

    public class UpdateTipos_contribuyenteCommandHandler : IRequestHandler<UpdateTipos_contribuyenteCommand, Response<int>>
    {
        private readonly IRepositoryAsync<tipos_contribuyente> _repositoryAsync;

        public UpdateTipos_contribuyenteCommandHandler(IRepositoryAsync<tipos_contribuyente> repositoryAsync)
        {
            _repositoryAsync = repositoryAsync;
        }

        public async Task<Response<int>> Handle(UpdateTipos_contribuyenteCommand request, CancellationToken cancellationToken)
        {
            var tiposContribuyente = await _repositoryAsync.GetByIdAsync(request.Id);

            if (tiposContribuyente == null)
            {
                throw new KeyNotFoundException($"Registro no encontrado con el id {request.Id}");
            }
            else
            {
                tiposContribuyente.Id = request.Id;
                tiposContribuyente.Tipo = request.Tipo;


                await _repositoryAsync.UpdateAsync(tiposContribuyente);

                return new Response<int>(tiposContribuyente.Id);
            }
        }
    }
}
