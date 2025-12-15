using Application.Interfaces;
using Application.Wrappers;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Features.Usuarios.Commands
{
    public class UpdateUsuariosCommand : IRequest<Response<int>>
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public int? Rol_Id { get; set; }
        public string? Estado { get; set; }
    }

    public class UpdateUsuariosCommandHandler : IRequestHandler<UpdateUsuariosCommand, Response<int>>
    {
        private readonly IRepositoryAsync<usuarios> _repositoryAsync;
        private readonly IPasswordHasher<usuarios> _passwordHasher;
        public UpdateUsuariosCommandHandler(IRepositoryAsync<usuarios> repositoryAsync, IPasswordHasher<usuarios> passwordHasher)
        {
            _repositoryAsync = repositoryAsync;
            _passwordHasher = passwordHasher;
        }

        public async Task<Response<int>> Handle(UpdateUsuariosCommand request, CancellationToken cancellationToken)
        {
            var usuarios = await _repositoryAsync.GetByIdAsync(request.Id);

            if (usuarios == null)
            {
                throw new KeyNotFoundException($"Registro no encontrado con el id {request.Id}");
            }
            else
            {
                usuarios.Id = request.Id;
                usuarios.Username = request.Username;


                if (!string.IsNullOrEmpty(request.Password))
                {
                    usuarios.Password_Hash = _passwordHasher.HashPassword(usuarios, request.Password);
                }

                usuarios.Email = request.Email;
                usuarios.Rol_Id = request.Rol_Id;
                usuarios.Estado = request.Estado;


                await _repositoryAsync.UpdateAsync(usuarios);

                return new Response<int>(usuarios.Id);
            }
        }
    }
}
