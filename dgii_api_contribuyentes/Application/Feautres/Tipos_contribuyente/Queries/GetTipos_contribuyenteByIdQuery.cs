using Application.DTOs;
using Application.Interfaces;
using Application.Wrappers;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.Tipos_contribuyente.Queries
{
    public class GetTipos_contribuyenteByIdQuery : IRequest<Response<Tipos_contribuyentesDto>>
    {
        public int Id { get; set; }
    }

    public class GetTipos_contribuyenteByIdQueryHandler : IRequestHandler<GetTipos_contribuyenteByIdQuery, Response<Tipos_contribuyentesDto>>
    {
        private readonly IRepositoryAsync<tipos_contribuyente> _repositoryAsync;
        private readonly IMapper _mapper;

        public GetTipos_contribuyenteByIdQueryHandler(IRepositoryAsync<tipos_contribuyente> repositoryAsync, IMapper mapper)
        {
            _repositoryAsync = repositoryAsync;
            _mapper = mapper;
        }

        public async Task<Response<Tipos_contribuyentesDto>> Handle(GetTipos_contribuyenteByIdQuery request, CancellationToken cancellationToken)
        {
            var tiposContribuyente = await _repositoryAsync.GetByIdAsync(request.Id);

            if (tiposContribuyente == null)
            {
                throw new KeyNotFoundException($"Registro no encontrado con el id {request.Id}");
            }
            else
            {
                var dto = _mapper.Map<Tipos_contribuyentesDto>(tiposContribuyente);
                return new Response<Tipos_contribuyentesDto>(dto);
            }
        }
    }
}
