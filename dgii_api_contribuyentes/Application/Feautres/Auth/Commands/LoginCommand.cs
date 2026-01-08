using Application.DTOs;
using Application.Interfaces;
using Application.Specifications;
using Application.Wrappers;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Feautres.Auth.Commands
{
    public class LoginCommand : IRequest<Response<LoginResponseDto>>
    {
        public string? Email { get; set; }
        public string? Password { get; set; }
    }

    public class LoginCommandHandler : IRequestHandler<LoginCommand, Response<LoginResponseDto>>
    {
        private readonly IRepositoryAsync<usuarios> _repositoryAsync;
        private readonly IPasswordHasher<usuarios> _passwordHasher;
        private readonly IJwtService _jwtService;

#pragma warning disable IDE0290
        public LoginCommandHandler(IRepositoryAsync<usuarios> repositoryAsync, IPasswordHasher<usuarios> passwordHasher, IJwtService jwtService)
        {
            _passwordHasher = passwordHasher;
            _jwtService = jwtService;
            _repositoryAsync = repositoryAsync;
        }
#pragma warning restore IDE0290

        public async Task<Response<LoginResponseDto>> Handle(
     LoginCommand request,
     CancellationToken cancellationToken)
        {
            var spec = new GetUsuarioByEmailSpecification(request.Email!);
            var users = await _repositoryAsync.ListAsync(spec, cancellationToken);
            var user = users.FirstOrDefault();

            if (user == null)
                return new Response<LoginResponseDto>("Credenciales inválidas");

            var passwordResult = _passwordHasher.VerifyHashedPassword(
                user,
                user.Password_Hash!,
                request.Password!
            );

            if (passwordResult == PasswordVerificationResult.Failed)
                return new Response<LoginResponseDto>("Credenciales inválidas");

            if (user.Estado != "Activo")
                return new Response<LoginResponseDto>("Usuario inactivo");

            var token = _jwtService.GenerateToken(user);

            return new Response<LoginResponseDto>(new LoginResponseDto
            {
                Token = token,
                Expiration = DateTime.UtcNow.AddMinutes(20)
            });
        }

    }
}
