using Ardalis.Specification;
using Domain.Entities;

namespace Application.Specifications
{
    public class PagedRoles_usuarioSpecification : Specification<roles_usuario>
    {
        public PagedRoles_usuarioSpecification(
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
