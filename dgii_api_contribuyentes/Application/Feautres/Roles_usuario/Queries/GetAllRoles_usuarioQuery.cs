
using Application.DTOs;
using Application.Interfaces;
using Application.Parameters;
using Application.Specifications;
using Application.Wrappers;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.Roles_usuario.Queries
{
    public class GetAllRoles_usuarioQuery : RequestParameter, IRequest<PagedResponse<List<Roles_usuariosDto>>>
    {
        public class GetAllRoles_usuarioQueryHandler : IRequestHandler<GetAllRoles_usuarioQuery, PagedResponse<List<Roles_usuariosDto>>>
        {
            private readonly IRepositoryAsync<roles_usuario> _repositoryAsync;
            private readonly IMapper _mapper;

            public GetAllRoles_usuarioQueryHandler(IRepositoryAsync<roles_usuario> repositoryAsync, IMapper mapper)
            {
                _repositoryAsync = repositoryAsync;
                _mapper = mapper;
            }

            public async Task<PagedResponse<List<Roles_usuariosDto>>> Handle(GetAllRoles_usuarioQuery request, CancellationToken cancellationToken)
            {
                var totalRecords = await _repositoryAsync.CountAsync(
                    new PagedRoles_usuarioSpecification(
                        int.MaxValue,
                        1
                        )
                    );

                // 2. Obtener la página solicitada
                var roles = await _repositoryAsync.ListAsync(
                    new PagedRoles_usuarioSpecification(
                        request.PageSize,
                        request.PageNumber
                    )
                );

                // 3. Mapper -> DTO
                var dto = _mapper.Map<List<Roles_usuariosDto>>(roles);

                // 4. Retornar respuesta paginada
                return new PagedResponse<List<Roles_usuariosDto>>(
                    dto,
                    request.PageNumber,
                    request.PageSize,
                    totalRecords
                );
            }
        }
    }
}
