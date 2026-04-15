using Application.Interfaces;
using Application.Wrappers;
using MediatR;

namespace Application.Features.Contribuyentes.Commands
{
    public class DeleteContribuyenteCommand : IRequest<Response<int>>
    {
        public int Id { get; set; }
    }

    public class DeleteContribuyenteCommandHandler : IRequestHandler<DeleteContribuyenteCommand, Response<int>>
    {
        private readonly IRepositoryAsync<Domain.Entities.Contribuyente> _repositoryAsync;

        public DeleteContribuyenteCommandHandler(IRepositoryAsync<Domain.Entities.Contribuyente> repositoryAsync)
        {
            _repositoryAsync = repositoryAsync;
        }

        public async Task<Response<int>> Handle(DeleteContribuyenteCommand request, CancellationToken cancellationToken)
        {
            var contribuyente = await _repositoryAsync.GetByIdAsync(request.Id);

            if (contribuyente == null)
            {
                throw new KeyNotFoundException($"Registro no encontrado con el id {request.Id}");
            }
            else
            {
                await _repositoryAsync.DeleteAsync(contribuyente);

                return new Response<int>(contribuyente.Id);
            }
        }
    }
}
