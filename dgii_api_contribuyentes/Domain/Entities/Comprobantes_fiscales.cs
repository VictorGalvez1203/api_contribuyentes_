using Domain.Common;

namespace Domain.Entities
{
    //Esta clase se usara en la carpeta Feautres, para la carpeta que tiene el mismo nombre, para las capertas Commands y Queries. 
    public class Comprobantes_fiscales : AuditableBaseEntity
    {
        public int ContribuyenteId { get; set; }
        public Contribuyente Contribuyente { get; set; }
        public string Ncf {  get; set; }
        public DateTime FechaEmision {  get; set; }

        private decimal _monto;
        public decimal Monto 
        {
            get => _monto;
            set
            { 
                _monto = value;
                Itbis18 = CalcularItbis(_monto);
            }
        }
        public decimal Itbis18 { get; private set; }
        public string? Descripcion { get; set; }


        private decimal CalcularItbis(decimal monto)
        {
            return Math.Round(monto * 0.18m, 2); // 18% con 2 decimales
        }
    }
}
