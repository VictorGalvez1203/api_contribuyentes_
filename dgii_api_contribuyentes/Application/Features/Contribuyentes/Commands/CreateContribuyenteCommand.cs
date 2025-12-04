using Application.Interfaces;
using Application.Wrappers;
using MediatR;
using Domain.Entities;
using AutoMapper;

namespace Application.Features.Contribuyentes.Commands
{
    public class CreateContribuyenteCommand : IRequest<Response<int>>
    {
        public string? FistName { get; set; }
        public string? LastName { get; set; }
        public string? RncCedula { get; set; }
        public int TipoContribuyenteId { get; set; }
        public string? Status { get; set; }
        public string? Numberphone { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }
    }

    public class CreateContribuyenteCommandHandler : IRequestHandler<CreateContribuyenteCommand, Response<int>>
    {
        private readonly IRepositoryAsync<Contribuyente> _repositoryAsync;
        private readonly IMapper _mapper;

        public CreateContribuyenteCommandHandler(IRepositoryAsync<Contribuyente> repositoryAsync, IMapper mapper)
        {
            _repositoryAsync = repositoryAsync;
            _mapper = mapper;
        }

        public async Task<Response<int>> Handle(CreateContribuyenteCommand request, CancellationToken cancellationToken)
        {
            var nuevoRegistro = _mapper.Map<Contribuyente>(request);
            var data = await _repositoryAsync.AddAsync(nuevoRegistro);

            return new Response<int>(data.Id);
        }
    }
}
