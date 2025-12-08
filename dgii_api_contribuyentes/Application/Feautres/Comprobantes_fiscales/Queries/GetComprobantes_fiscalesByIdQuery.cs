using Application.DTOs;
using Application.Interfaces;
using Application.Wrappers;
using AutoMapper;
using MediatR;

namespace Application.Features.Comprobantes_fiscales.Queries
{
    public class GetComprobantes_fiscalesByIdQuery : IRequest<Response<ComprobantesFiscalesDto>>
    {
        public int Id { get; set; }

        public class GetComprobantes_fiscalesByIdQueryHandler : IRequestHandler<GetComprobantes_fiscalesByIdQuery, Response<ComprobantesFiscalesDto>>
        {
            private readonly IRepositoryAsync<Domain.Entities.Comprobantes_fiscales> _repositoryAsync;
            private readonly IMapper _mapper;

            public GetComprobantes_fiscalesByIdQueryHandler(IRepositoryAsync<Domain.Entities.Comprobantes_fiscales> repositoryAsync, IMapper mapper)
            {
                _repositoryAsync = repositoryAsync;
                _mapper = mapper;
            }

            public async Task<Response<ComprobantesFiscalesDto>> Handle(GetComprobantes_fiscalesByIdQuery request, CancellationToken cancellationToken)
            {
                var comprobantesFiscales = await _repositoryAsync.GetByIdAsync(request.Id);

                if (comprobantesFiscales == null)
                {
                    throw new KeyNotFoundException($"Registro no encontrado con el id {request.Id}");
                }
                else
                {
                    var dto = _mapper.Map<ComprobantesFiscalesDto>(comprobantesFiscales);
                    return new Response<ComprobantesFiscalesDto>(dto);
                }
            }
        }
    }
}
