using Ardalis.Specification;
using Domain.Entities;

namespace Application.Specifications
{
    public class PagedTipos_contribuyenteSpecification : Specification<tipos_contribuyente>
    {
        public PagedTipos_contribuyenteSpecification(
            int pageSize,
            int pageNumber)
        {
            // Ordenar por Id
            Query.OrderBy(r => r.Id);

            // Paginación
            Query.Skip((pageNumber - 1) * pageSize)
                 .Take(pageSize);
        }
    }
}
