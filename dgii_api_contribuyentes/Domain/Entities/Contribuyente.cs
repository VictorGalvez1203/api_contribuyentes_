using Domain.Common;

namespace Domain.Entities
{
    //Esta es mi entidad que esta en mi base de datos, esto es lo que no tengo que exponer en mi API
    //Esta clase se usara en la carpeta Feautres, para la carpeta que tiene el mismo nombre, para las capertas Commands y Queries. 
    public class Contribuyente : AuditableBaseEntity
    {
        public string? FistName { get; set; }
        public string? LastName { get; set; }
        public string? RncCedula { get; set; }
        public int TipoContribuyenteId { get; set; }
        public tipos_contribuyente? TipoContribuyente { get; set; }

        public string? Status { get; set; }
        public string? Numberphone { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }

        //Navegación hacia los comprobantes fiscales
        public ICollection<Comprobantes_fiscales>? Comprobantes { get; set; }
    }
}
