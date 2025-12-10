using Ardalis.Specification;
using Domain.Entities;

namespace Application.Specifications
{
    public class PagedUsuariosSpecification : Specification<usuarios>
    {
        public PagedUsuariosSpecification(
            int pageSize,
            int pageNumber,
            string? Username,
            int? Rol_Id,
            string? Estado)
        {
            // 🔹 Filtro por Username
            if (!string.IsNullOrWhiteSpace(Username))
            {
                Query.Where(u => u.Username.Contains(Username));
            }

            // 🔹 Filtro por Rol
            if (Rol_Id.HasValue && Rol_Id.Value > 0)
            {
                Query.Where(u => u.Rol_Id == Rol_Id.Value);
            }

            // 🔹 Filtro por Estado
            if (!string.IsNullOrWhiteSpace(Estado))
            {
                Query.Where(u => u.Estado.Contains(Estado));
            }

            // 🔹 Ordenación estable (primario Username)
            Query.OrderBy(u => u.Username)
                 .ThenBy(u => u.Email);

            // 🔹 Paginación
            Query.Skip((pageNumber - 1) * pageSize)
                 .Take(pageSize);
        }
    }
}
