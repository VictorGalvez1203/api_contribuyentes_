using Domain.Common;

namespace Domain.Entities
{
    //Esta es mi entidad que esta en mi base de datos, esto es lo que no tengo que exponer en mi API
    //Esta clase se usara en la carpeta Feautres, para la carpeta que tiene el mismo nombre, para las capertas Commands y Queries. 
    public class usuarios : AuditableBaseEntity
    {
        public string Username { get; set; }
        public byte[] Password_Hash { get; set; }
        public string Email { get; set; }
        public int Rol_Id { get; set; }
        public roles_usuario Rol { get; set; }
        public string Estado {  get; set; }

    }
}
