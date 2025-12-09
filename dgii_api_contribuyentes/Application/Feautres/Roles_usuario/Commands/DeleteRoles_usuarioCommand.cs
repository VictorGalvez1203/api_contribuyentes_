
using Application.Interfaces;
using Application.Wrappers;
using MediatR;

namespace Application.Features.Roles_usuario.Commands
{
    public class DeleteRoles_usuarioCommand : IRequest<Response<int>>
    {
        public int Id { get; set; }
    }

    public class DeleteRoles_usuarioCommandHandler : IRequestHandler<DeleteRoles_usuarioCommand, Response<int>>
    {
        private readonly IRepositoryAsync<Domain.Entities.roles_usuario> _repositoryAsync;

        public DeleteRoles_usuarioCommandHandler(IRepositoryAsync<Domain.Entities.roles_usuario> repositoryAsync)
        {
            _repositoryAsync = repositoryAsync;
        }

        public async Task<Response<int>> Handle(DeleteRoles_usuarioCommand request, CancellationToken cancellationToken)
        {
            var RolUsuario = await _repositoryAsync.GetByIdAsync(request.Id);

            if (RolUsuario == null)
            {
                throw new KeyNotFoundException($"Registro no encontrado con el id {request.Id}");
            }
            else
            {
                await _repositoryAsync.DeleteAsync(RolUsuario);

                return new Response<int>(RolUsuario.Id);
            }
        }
    }
}
