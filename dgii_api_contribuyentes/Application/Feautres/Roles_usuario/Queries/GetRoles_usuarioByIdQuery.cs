using Application.DTOs;
using Application.Interfaces;
using Application.Wrappers;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.Roles_usuario.Queries
{
    public class GetRoles_usuarioByIdQuery : IRequest<Response<Roles_usuariosDto>>
    {
        public int Id { get; set; }

        public class GetRoles_usuarioByIdQueryHandler : IRequestHandler<GetRoles_usuarioByIdQuery, Response<Roles_usuariosDto>>
        {
            private readonly IRepositoryAsync<roles_usuario> _repositoryAsync;
            private readonly IMapper _mapper;
            public GetRoles_usuarioByIdQueryHandler(IRepositoryAsync<roles_usuario> repositoryAsync, IMapper mapper)
            {
                _repositoryAsync = repositoryAsync;
                _mapper = mapper;
            }

            public async Task<Response<Roles_usuariosDto>> Handle(GetRoles_usuarioByIdQuery request, CancellationToken cancellationToken)
            {
                var rolesUsuarios = await _repositoryAsync.GetByIdAsync(request.Id);

                if (rolesUsuarios == null)
                {
                    throw new KeyNotFoundException($"Registro no encontrado con el id {request.Id}");
                }
                else
                {
                    var dto = _mapper.Map<Roles_usuariosDto>(rolesUsuarios);
                    return new Response<Roles_usuariosDto>(dto);
                }
            }
        }
    }
}
