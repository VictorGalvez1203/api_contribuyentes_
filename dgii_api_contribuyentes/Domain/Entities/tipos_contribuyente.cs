using Domain.Common;

namespace Domain.Entities
{
    //Esta es mi entidad que esta en mi base de datos, esto es lo que no tengo que exponer en mi API
    //Esta clase se usara en la carpeta Feautres, para la carpeta que tiene el mismo nombre, para las capertas Commands y Queries. 

    public class tipos_contribuyente : AuditableBaseEntity
    {
        public string Tipo { get; set; }

        public ICollection<Contribuyente> Contribuyentes { get; set; }
    }
}
