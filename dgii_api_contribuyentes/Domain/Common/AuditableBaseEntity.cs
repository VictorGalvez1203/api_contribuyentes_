
namespace Domain.Common
{
    //Estos son los atributos basicos que deben de tener todas las entidades, principales. Dichas van en la carpeta Entities
    public abstract class AuditableBaseEntity
    {
        public virtual int Id { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Created {  get; set; }

        public string LastModifiedBy { get; set; }

        public DateTime? LasModified { get; set; }
    }
}
