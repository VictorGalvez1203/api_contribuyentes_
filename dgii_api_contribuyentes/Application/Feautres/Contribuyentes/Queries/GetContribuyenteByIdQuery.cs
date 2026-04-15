
using Application.DTOs;
using Application.Interfaces;
using Application.Wrappers;
using AutoMapper;
using MediatR;

namespace Application.Features.Contribuyentes.Queries
{
    public class GetContribuyenteByIdQuery : IRequest<Response<ContribuyentesDto>>
    {
        public int Id { get; set; }

        public class GetContribuyenteByIdQueryHandler : IRequestHandler<GetContribuyenteByIdQuery, Response<ContribuyentesDto>>
        {
            private readonly IRepositoryAsync<Domain.Entities.Contribuyente> _repositoryAsync;
            private readonly IMapper _mapper;

            public GetContribuyenteByIdQueryHandler(IRepositoryAsync<Domain.Entities.Contribuyente> repositoryAsync, IMapper mapper)
            {
                _repositoryAsync = repositoryAsync;
                _mapper = mapper;
            }

            public async Task<Response<ContribuyentesDto>> Handle(GetContribuyenteByIdQuery request, CancellationToken cancellationToken)
            {
                var contribuyente = await _repositoryAsync.GetByIdAsync(request.Id);

                if (contribuyente == null)
                {
                    throw new KeyNotFoundException($"Registro no encontrado con el id {request.Id}");
                }
                else
                {
                    var dto = _mapper.Map<ContribuyentesDto>(contribuyente);
                    return new Response<ContribuyentesDto>(dto);
                }
            }
        }
    }
}
