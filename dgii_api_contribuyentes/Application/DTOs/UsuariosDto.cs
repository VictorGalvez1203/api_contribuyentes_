using Domain.Entities;

namespace Application.DTOs
{
    public class UsuariosDto
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? Password_Hash { get; set; }
        public string? Email { get; set; }
        public int? Rol_Id { get; set; }
        public string? Estado { get; set; }
    }
}
