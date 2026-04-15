using Application.Interfaces;
using Application.Wrappers;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.Tipos_contribuyente.Commands
{
    public class CreateTipos_contribuyenteCommand : IRequest<Response<int>>
    {
        public string? Tipo { get; set; }
    }

    public class CreateTipos_contribuyenteCommandHandler : IRequestHandler<CreateTipos_contribuyenteCommand, Response<int>>
    {
        private readonly IRepositoryAsync<tipos_contribuyente> _repositoryAsync;
        private readonly IMapper _mapper;

        public CreateTipos_contribuyenteCommandHandler(IRepositoryAsync<tipos_contribuyente> repositoryAsync, IMapper mapper)
        {
            _repositoryAsync = repositoryAsync;
            _mapper = mapper;
        }

        public async Task<Response<int>> Handle(CreateTipos_contribuyenteCommand request, CancellationToken cancellationToken)
        {
            var nuevoRegistro = _mapper.Map<tipos_contribuyente>(request);
            var data = await _repositoryAsync.AddAsync(nuevoRegistro);
            return new Response<int>(data.Id);
        }
    }
}
