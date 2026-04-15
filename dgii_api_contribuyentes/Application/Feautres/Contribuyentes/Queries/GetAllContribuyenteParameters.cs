
using Application.Parameters;

namespace Application.Feautres.Contribuyentes.Queries
{
    public class GetAllContribuyenteParameters : RequestParameter
    {
        public string? FistName { get; set; }
        public string? LastName { get; set; }
        public string? RncCedula { get; set; }
        public int TipoContribuyenteId { get; set; }
        public string? Status { get; set; }
    }
}
