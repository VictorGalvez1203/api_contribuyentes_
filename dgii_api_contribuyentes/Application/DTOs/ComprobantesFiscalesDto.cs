using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class ComprobantesFiscalesDto
    {
        public int Id { get; set; }
        public int ContribuyenteId { get; set; }
        public string? Ncf { get; set; }
        public DateTime FechaEmision { get; set; }
        public decimal Monto { get; set; }
        public decimal Itbis18 { get; set; }
        public string? Descripcion { get; set; }
    }
}
