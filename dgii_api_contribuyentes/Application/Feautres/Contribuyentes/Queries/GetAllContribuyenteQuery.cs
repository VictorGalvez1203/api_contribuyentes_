
using Application.DTOs;
using Application.Interfaces;
using Application.Specifications;
using Application.Wrappers;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.Contribuyentes.Queries
{
    public class GetAllContribuyenteQuery : IRequest<PagedResponse<List<ContribuyentesDto>>>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string? FistName { get; set; }
        public string? LastName { get; set; }
        public string? RncCedula { get; set; }
        public int TipoContribuyenteId { get; set; }
        public string? Status { get; set; }

        public class GetAllContribuyenteQueryHandler : IRequestHandler<GetAllContribuyenteQuery, PagedResponse<List<ContribuyentesDto>>>
        {
            private readonly IRepositoryAsync<Domain.Entities.Contribuyente> _repositoryAsync;
            private readonly IMapper _mapper;
            public GetAllContribuyenteQueryHandler(IRepositoryAsync<Contribuyente> repositoryAsync, IMapper mapper)
            {
                _repositoryAsync = repositoryAsync;
                _mapper = mapper;
            }

            public async Task<PagedResponse<List<ContribuyentesDto>>> Handle(GetAllContribuyenteQuery request, CancellationToken cancellationToken)
            {
            var totalRecords = await _repositoryAsync.CountAsync(
                new PagedContribuyenteSpecification(
                    int.MaxValue,
                    1,
                    request.FistName,
                    request.LastName,
                    request.RncCedula,
                    request.TipoContribuyenteId,
                    request.Status
                )
            );

                // Obtener la página solicitada
                var contribuyentes = await _repositoryAsync.ListAsync(
                    new PagedContribuyenteSpecification(
                        request.PageSize,
                        request.PageNumber,
                        request.FistName,
                        request.LastName,
                        request.RncCedula,
                        request.TipoContribuyenteId,
                        request.Status
                    )
                );

                var dto = _mapper.Map<List<ContribuyentesDto>>(contribuyentes);

                return new PagedResponse<List<ContribuyentesDto>>(
                    dto,
                    request.PageNumber,
                    request.PageSize,
                    totalRecords
                );
            }
        }
    }
}
