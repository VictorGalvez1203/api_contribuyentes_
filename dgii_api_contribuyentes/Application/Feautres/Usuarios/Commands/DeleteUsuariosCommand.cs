using Application.Interfaces;
using Application.Wrappers;
using Domain.Entities;
using MediatR;

namespace Application.Features.Usuarios.Commands
{
    public class DeleteUsuariosCommand : IRequest<Response<int>>
    {
        public int Id { get; set; }
    }

    public class DeleteUsuariosCommandHandler : IRequestHandler<DeleteUsuariosCommand, Response<int>>
    {
        private readonly IRepositoryAsync<usuarios> _repositoryAsync;

        public DeleteUsuariosCommandHandler(IRepositoryAsync<usuarios> repositoryAsync)
        {
            _repositoryAsync = repositoryAsync;
        }

        public async Task<Response<int>> Handle(DeleteUsuariosCommand request, CancellationToken cancellationToken)
        {
            var usuarios = await _repositoryAsync.GetByIdAsync(request.Id);

            if (usuarios == null)
            {
                throw new KeyNotFoundException($"Registro no encontrado con el id {request.Id}");
            }
            else
            {
                await _repositoryAsync.DeleteAsync(usuarios);

                return new Response<int>(usuarios.Id);
            }
        }
    }
}
