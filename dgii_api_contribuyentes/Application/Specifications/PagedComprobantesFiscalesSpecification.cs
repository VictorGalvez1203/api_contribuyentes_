
using Ardalis.Specification;
using Domain.Entities;

namespace Application.Specifications
{
    public class PagedComprobantesFiscalesSpecification : Specification<Comprobantes_fiscales>
    {
        public PagedComprobantesFiscalesSpecification(int pageSize, int pageNumber, int? contribuyenteId, string? ncf, DateTime? fechaEmision)
        {
            // 🔹 Filtro opcional por ContribuyenteId
            if (contribuyenteId.HasValue && contribuyenteId.Value > 0)
            {
                Query.Where(c => c.ContribuyenteId == contribuyenteId.Value);
            }

            // 🔹 Filtro opcional por NCF
            if (!string.IsNullOrWhiteSpace(ncf))
            {
                Query.Where(c => c.Ncf.Contains(ncf));
            }


            // 🔹 Filtro opcional por Fecha de Emisión
            if (fechaEmision.HasValue)
            {
                Query.Where(c => c.FechaEmision.Date == fechaEmision.Value.Date);
            }

            // 🔹 Ordenación para paginación estable
            Query.OrderByDescending(c => c.FechaEmision);

            // 🔹 Paginación
            Query.Skip((pageNumber - 1) * pageSize)
                 .Take(pageSize);
        }
    }
}
