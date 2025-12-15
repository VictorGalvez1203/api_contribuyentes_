using Application.Interfaces;
using Application.Wrappers;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Features.Usuarios.Commands
{
    public class CreateUsuariosCommand : IRequest<Response<int>>
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public int? Rol_Id { get; set; }
        public string? Estado { get; set; }
    }

    public class CreateUsuariosCommandHandler : IRequestHandler<CreateUsuariosCommand, Response<int>>
    {
        private readonly IRepositoryAsync<usuarios> _repositoryAsync;
        private readonly IMapper _mapper;
        private readonly IPasswordHasher<usuarios> _passwordHasher;


        public CreateUsuariosCommandHandler(IRepositoryAsync<usuarios> repositoryAsync, IMapper mapper, IPasswordHasher<usuarios> passwordHasher)
        {
            _repositoryAsync = repositoryAsync;
            _mapper = mapper;
            _passwordHasher = passwordHasher;
        }

        public async Task<Response<int>> Handle(CreateUsuariosCommand request, CancellationToken cancellationToken)
        {
            var nuevoUsuario = _mapper.Map<usuarios>(request);

            // Hashear la contraseña aquí
            if (!string.IsNullOrEmpty(request.Password))
            {
                nuevoUsuario.Password_Hash = _passwordHasher.HashPassword(nuevoUsuario, request.Password);
            }

            var data = await _repositoryAsync.AddAsync(nuevoUsuario);

            return new Response<int>(data.Id);
        }
    }
}
