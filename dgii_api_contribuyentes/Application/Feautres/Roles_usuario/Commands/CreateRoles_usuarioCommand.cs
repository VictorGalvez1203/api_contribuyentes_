
using Application.Interfaces;
using Application.Wrappers;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.Roles_usuario.Commands
{
    public class CreateRoles_usuarioCommand : IRequest<Response<int>>
    {
        public string? NombreRol { get; set; }
    }

    public class CreateRoles_usuarioCommandHandler : IRequestHandler<CreateRoles_usuarioCommand, Response<int>>
    {
        private readonly IRepositoryAsync<roles_usuario> _repositoryAsync;
        private readonly IMapper _mapper;

        public CreateRoles_usuarioCommandHandler(IRepositoryAsync<roles_usuario> repositoryAsync, IMapper mapper)
        {
            _repositoryAsync = repositoryAsync;
            _mapper = mapper;
        }

        public async Task<Response<int>> Handle(CreateRoles_usuarioCommand request, CancellationToken cancellationToken)
        {
            var nuevoRegistro = _mapper.Map<roles_usuario>(request);
            var data = await _repositoryAsync.AddAsync(nuevoRegistro);
            return new Response<int>(data.Id);
        }
    }
}
