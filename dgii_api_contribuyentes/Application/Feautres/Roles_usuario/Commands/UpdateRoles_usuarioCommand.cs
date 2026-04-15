
using Application.Interfaces;
using Application.Wrappers;
using MediatR;

namespace Application.Features.Roles_usuario.Commands
{
    public class UpdateRoles_usuarioCommand : IRequest<Response<int>>
    {
        public int Id { get; set; }
        public string? NombreRol { get; set; }
    }

    public class UpdateRoles_usuarioCommandHandler : IRequestHandler<UpdateRoles_usuarioCommand, Response<int>>
    {
        private readonly IRepositoryAsync<Domain.Entities.roles_usuario> _repositoryAsync;
        public UpdateRoles_usuarioCommandHandler(IRepositoryAsync<Domain.Entities.roles_usuario> repositoryAsync)
        {
            _repositoryAsync = repositoryAsync;
        }

        public async Task<Response<int>> Handle(UpdateRoles_usuarioCommand request, CancellationToken cancellationToken)
        {
            var rolesUsuarios = await _repositoryAsync.GetByIdAsync(request.Id);

            if (rolesUsuarios == null)
            {
                throw new KeyNotFoundException($"Registro no encontrado con el id {request.Id}");
            }
            else
            {
                rolesUsuarios.Id = request.Id;
                rolesUsuarios.NombreRol = request.NombreRol;


                await _repositoryAsync.UpdateAsync(rolesUsuarios);

                return new Response<int>(rolesUsuarios.Id);
            }
        }
    }
}
