using Application.Interfaces;
using Application.Wrappers;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.Usuarios.Commands
{
    public class CreateUsuariosCommand : IRequest<Response<int>>
    {
        public string? Username { get; set; }
        public byte[]? Password_Hash { get; set; }
        public string? Email { get; set; }
        public int? Rol_Id { get; set; }
        public string? Estado { get; set; }
    }

    public class CreateUsuariosCommandHandler : IRequestHandler<CreateUsuariosCommand, Response<int>>
    {
        private readonly IRepositoryAsync<usuarios> _repositoryAsync;
        private readonly IMapper _mapper;

        public CreateUsuariosCommandHandler(IRepositoryAsync<usuarios> repositoryAsync, IMapper mapper)
        {
            _repositoryAsync = repositoryAsync;
            _mapper = mapper;
        }

        public async Task<Response<int>> Handle(CreateUsuariosCommand request, CancellationToken cancellationToken)
        {
            var nuevoUsuario = _mapper.Map<usuarios>(request);
            var data = await _repositoryAsync.AddAsync(nuevoUsuario);

            return new Response<int>(data.Id);
        }
    }
}
