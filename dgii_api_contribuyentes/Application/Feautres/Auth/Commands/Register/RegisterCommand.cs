using Application.Interfaces;
using Application.Specifications;
using Application.Wrappers;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Feautres.Auth.Commands.Register
{
    public class RegisterCommand : IRequest<Response<int>>
    {
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
    }

    public class RegisterCommandHandler
        : IRequestHandler<RegisterCommand, Response<int>>
    {
        private readonly IRepositoryAsync<usuarios> _repositoryAsync;
        private readonly IPasswordHasher<usuarios> _passwordHasher;

        public RegisterCommandHandler(
            IRepositoryAsync<usuarios> repositoryAsync,
            IPasswordHasher<usuarios> passwordHasher)
        {
            _repositoryAsync = repositoryAsync;
            _passwordHasher = passwordHasher;
        }

        public async Task<Response<int>> Handle(
            RegisterCommand request,
            CancellationToken cancellationToken)
        {
            // 1️ Verificar si el email ya existe
            var spec = new GetUsuarioByEmailSpecification(request.Email);
            var users = await _repositoryAsync.ListAsync(spec, cancellationToken);

            if (users.Any())
            {
                return new Response<int>("El correo ya está registrado.");
            }


            // 2️ Crear entidad usuario
            var user = new usuarios
            {
                Username = request.Username,
                Email = request.Email,
                Estado = "Activo",
                Rol_Id = 2 // Rol básico por defecto
            };

            // 3️ Hashear contraseña
            user.Password_Hash = _passwordHasher.HashPassword(user, request.Password);

            // 4️ Guardar
            await _repositoryAsync.AddAsync(user, cancellationToken);

            // 5️ Respuesta
            return new Response<int>(user.Id);
        }
    }
}
