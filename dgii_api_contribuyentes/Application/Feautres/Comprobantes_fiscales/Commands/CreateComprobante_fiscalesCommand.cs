using Application.Interfaces;
using Application.Wrappers;
using MediatR;
using AutoMapper;


namespace Application.Feautres.Comprobantes_fiscales.Commands
{
    public class CreateComprobante_fiscalesCommand : IRequest<Wrappers.Response<int>>
    {
        public string? Ncf { get; set; }
        public DateTime Fecha_Emision { get; set; }
        public decimal Monto { get; set; }
        public string? Descripcion { get; set; }
    }

    public class CreateComprobante_fiscalesCommandHandler : IRequestHandler<CreateComprobante_fiscalesCommand, Response<int>>
    {
        private readonly IRepositoryAsync<Domain.Entities.Comprobantes_fiscales> _repositoryAsync;
        private readonly IMapper _mapper;

        public CreateComprobante_fiscalesCommandHandler(IRepositoryAsync<Domain.Entities.Comprobantes_fiscales> repositoryAsync, IMapper mapper)
        {
            _repositoryAsync = repositoryAsync;
            _mapper = mapper;
        }

        public async Task<Response<int>> Handle(CreateComprobante_fiscalesCommand request, CancellationToken cancellationToken)
        {
            var nuevoRegistro = _mapper.Map<Domain.Entities.Comprobantes_fiscales>(request);
            var data = await _repositoryAsync.AddAsync(nuevoRegistro);

            return new Response<int>(data.Id);
        }
    }
}
