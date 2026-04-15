using Application.Interfaces;
using Application.Specifications;
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
            // 1️⃣ Validar email duplicado
            if (!string.IsNullOrWhiteSpace(request.Email))
            {
                var spec = new GetUsuarioByEmailSpecification(request.Email);
                var usuarios = await _repositoryAsync.ListAsync(spec, cancellationToken);

                if (usuarios.Any())
                {
                    return new Response<int>("El correo ya está registrado.");
                }
            }

            // 2️⃣ Crear entidad
            var nuevoUsuario = _mapper.Map<usuarios>(request);

            // 3️⃣ Hashear contraseña
            if (!string.IsNullOrEmpty(request.Password))
            {
                nuevoUsuario.Password_Hash =
                    _passwordHasher.HashPassword(nuevoUsuario, request.Password);
            }

            // 4️⃣ Guardar
            var data = await _repositoryAsync.AddAsync(nuevoUsuario, cancellationToken);

            // 5️⃣ OK
            return new Response<int>(data.Id);
        }
    }
}
