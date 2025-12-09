
using Application.Parameters;

namespace Application.Feautres.Comprobantes_fiscales.Queries
{
    public class GetAllComprobanteFiscalParameters : RequestParameter
    {
        public int ContribuyenteId { get; set; }
        public string? Ncf { get; set; }
        public DateTime FechaEmision { get; set; }
    }
}
