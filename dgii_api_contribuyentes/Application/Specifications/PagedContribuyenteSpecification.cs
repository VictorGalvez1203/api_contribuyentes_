using Ardalis.Specification;
using Domain.Entities;

namespace Application.Specifications
{
    public class PagedContribuyenteSpecification : Specification<Contribuyente>
    {
        public PagedContribuyenteSpecification(
            int pageSize,
            int pageNumber,
            string? fistName,
            string? lastName,
            string? rncCedula,
            int tipoContribuyenteId,
            string? status
            )
        {
            // 🔹 Filtro por Nombre
            if (!string.IsNullOrWhiteSpace(fistName))
            {
                Query.Where(c => c.FistName.Contains(fistName));
            }

            // 🔹 Filtro por Apellido
            if (!string.IsNullOrWhiteSpace(lastName))
            {
                Query.Where(c => c.LastName.Contains(lastName));
            }

            // 🔹 Filtro por RNC o Cédula
            if (!string.IsNullOrWhiteSpace(rncCedula))
            {
                Query.Where(c => c.RncCedula.Contains(rncCedula));
            }

            // 🔹 Filtro por Tipo de Contribuyente
            if (tipoContribuyenteId > 0)
            {
                Query.Where(c => c.TipoContribuyenteId == tipoContribuyenteId);
            }

            // 🔹 Filtro por Estado
            if (!string.IsNullOrWhiteSpace(status))
            {
                Query.Where(c => c.Status.ToLower() == status.ToLower());
            }


            // 🔹 Ordenación estable
            Query.OrderBy(c => c.FistName)
                 .ThenBy(c => c.LastName);

            // 🔹 Paginación
            Query.Skip((pageNumber - 1) * pageSize)
                 .Take(pageSize);
        }
    }
}
