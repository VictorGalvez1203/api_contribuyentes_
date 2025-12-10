using Application.DTOs;
using Application.Interfaces;
using Application.Parameters;
using Application.Specifications;
using Application.Wrappers;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.Tipos_contribuyente.Queries
{
    public class GetAllTipos_contribuyenteQuery : RequestParameter, IRequest<PagedResponse<List<Tipos_contribuyentesDto>>>
    {
        public class GetAllTipos_contribuyenteQueryHandler : IRequestHandler<GetAllTipos_contribuyenteQuery, PagedResponse<List<Tipos_contribuyentesDto>>>
        {
            private readonly IRepositoryAsync<tipos_contribuyente> _repositoryAsync;
            private readonly IMapper _mapper;

            public GetAllTipos_contribuyenteQueryHandler(IRepositoryAsync<tipos_contribuyente> repositoryAsync, IMapper mapper)
            {
                _repositoryAsync = repositoryAsync;
                _mapper = mapper;
            }

            public async Task<PagedResponse<List<Tipos_contribuyentesDto>>> Handle(
                GetAllTipos_contribuyenteQuery request,
                CancellationToken cancellationToken)
            {
                var totalRecords = await _repositoryAsync.CountAsync(
                    new PagedTipos_contribuyenteSpecification(
                        int.MaxValue,
                        1
                    )
                );

                var entities = await _repositoryAsync.ListAsync(
                    new PagedTipos_contribuyenteSpecification(
                        request.PageSize,
                        request.PageNumber
                    )
                );

                var dto = _mapper.Map<List<Tipos_contribuyentesDto>>(entities);

                return new PagedResponse<List<Tipos_contribuyentesDto>>(
                    dto,
                    request.PageNumber,
                    request.PageSize,
                    totalRecords
                );
            }
        }
    }
}
