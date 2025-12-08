using Application.DTOs;
using Application.Interfaces;
using Application.Specifications;
using Application.Wrappers;
using AutoMapper;
using MediatR;

namespace Application.Features.Comprobantes_fiscales.Queries
{
    public class GetAllComprobantes_fiscalesQuery : IRequest<PagedResponse<List<ComprobantesFiscalesDto>>>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        public int ContribuyenteId { get; set; }
        public string? Ncf { get; set; }
        public DateTime FechaEmision { get; set; }

        public class GetAllComprobantes_fiscalesQueryHandler : IRequestHandler<GetAllComprobantes_fiscalesQuery, PagedResponse<List<ComprobantesFiscalesDto>>>
        {
            private readonly IRepositoryAsync<Domain.Entities.Comprobantes_fiscales> _repositoryAsync;
            private readonly IMapper _mapper;

            public GetAllComprobantes_fiscalesQueryHandler(IRepositoryAsync<Domain.Entities.Comprobantes_fiscales> repositoryAsync, IMapper mapper)
            {
                _repositoryAsync = repositoryAsync;
                _mapper = mapper;
            }
            public async Task<PagedResponse<List<ComprobantesFiscalesDto>>> Handle(GetAllComprobantes_fiscalesQuery request, CancellationToken cancellationToken)
            {
                DateTime? fechaFiltro = request.FechaEmision == default ? (DateTime?)null : request.FechaEmision;

                var totalRecords = await _repositoryAsync.CountAsync(
                    new PagedComprobantesFiscalesSpecification(
                        int.MaxValue,
                        1,
                        request.ContribuyenteId,
                        request.Ncf,
                        fechaFiltro
                    )
                );

                var comprobantes_fiscales = await _repositoryAsync.ListAsync(
                    new PagedComprobantesFiscalesSpecification(
                        request.PageSize,
                        request.PageNumber,
                        request.ContribuyenteId,
                        request.Ncf,
                        fechaFiltro
                    )
                );

                var dto = _mapper.Map<List<ComprobantesFiscalesDto>>(comprobantes_fiscales);

                return new PagedResponse<List<ComprobantesFiscalesDto>>(
                    dto,
                    request.PageNumber,
                    request.PageSize,
                    totalRecords
                );
            }
        }
    }
}
