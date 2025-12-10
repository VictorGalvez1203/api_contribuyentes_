using Application.DTOs;
using Application.Interfaces;
using Application.Specifications;
using Application.Wrappers;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.Usuarios.Queries
{
    public class GetAllUsuariosQuery : IRequest<PagedResponse<List<UsuariosDto>>>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string? Username { get; set; }
        public int? Rol_Id { get; set; }
        public string? Estado { get; set; }
    }

    public class GetAllUsuariosQueryHandler : IRequestHandler<GetAllUsuariosQuery, PagedResponse<List<UsuariosDto>>>
    {
        private readonly IRepositoryAsync<usuarios> _repositoryAsync;
        private readonly IMapper _mapper;

        public GetAllUsuariosQueryHandler(IRepositoryAsync<usuarios> repositoryAsync, IMapper mapper)
        {
            _repositoryAsync = repositoryAsync;
            _mapper = mapper;
        }

        public async Task<PagedResponse<List<UsuariosDto>>> Handle(GetAllUsuariosQuery request, CancellationToken cancellationToken)
        {
            var totalRecords = await _repositoryAsync.CountAsync(
                new PagedUsuariosSpecification(
                    int.MaxValue,
                    1,
                    request.Username,
                    request.Rol_Id,
                    request.Estado
                    )
                );

            var contribuyentes = await _repositoryAsync.ListAsync(
                new PagedUsuariosSpecification(
                    request.PageSize,
                    request.PageNumber,
                    request.Username,
                    request.Rol_Id,
                    request.Estado
                    )
                );

            var dto = _mapper.Map<List<UsuariosDto>>(contribuyentes);

            return new PagedResponse<List<UsuariosDto>>(
                dto,
                request.PageNumber,
                request.PageSize,
                totalRecords
            );
        }
    }
}
