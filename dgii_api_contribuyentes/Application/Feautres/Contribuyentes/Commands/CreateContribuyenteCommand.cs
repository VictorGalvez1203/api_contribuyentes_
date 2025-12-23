using Application.Interfaces;
using Application.Specifications;
using Application.Wrappers;
using AutoMapper;
using Domain.Entities;
using MediatR;

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
            // 1️⃣ Validar RNC/Cédula duplicado
            if (!string.IsNullOrWhiteSpace(request.RncCedula))
            {
                var spec = new GetContribuyenteByRncCedulaSpecification(request.RncCedula);
                var existentes = await _repositoryAsync.ListAsync(spec, cancellationToken);

                if (existentes.Any())
                {
                    return new Response<int>("El RNC/Cédula ya está registrado.");
                }
            }

            // 2️⃣ Mapear entidad
            var nuevoRegistro = _mapper.Map<Contribuyente>(request);

            // 3️⃣ Guardar
            var data = await _repositoryAsync.AddAsync(nuevoRegistro, cancellationToken);

            // 4️⃣ OK
            return new Response<int>(data.Id);
        }
    }
}
