using Domain.Common;

namespace Domain.Entities
{
    //Esta clase se usara en la carpeta Feautres, para la carpeta que tiene el mismo nombre, para las capertas Commands y Queries. 
    public class Comprobantes_fiscales : AuditableBaseEntity
    {
        public int ContribuyenteId { get; set; }
        public string Ncf {  get; set; }
        public DateTime FechaEmision {  get; set; }
        public decimal Monto { get; set; }
        public decimal Itbis18 { get; set; }
        public string Descripcion { get; set; }
    }
}
