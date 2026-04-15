using Application.Parameters;

namespace Application.Feautres.Usuarios.Queries
{
    public class GetAllUsuariosParameters : RequestParameter
    {
        public string? Username { get; set; }
        public int? Rol_Id { get; set; }
        public string? Estado { get; set; }
    }
}
