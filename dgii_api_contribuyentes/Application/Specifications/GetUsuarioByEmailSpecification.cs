using Ardalis.Specification;
using Domain.Entities;

namespace Application.Specifications
{
    public class GetUsuarioByEmailSpecification : Specification<usuarios>
    {
        public GetUsuarioByEmailSpecification(string email)
        {
           Query
                .Where(u => u.Email == email)
                .Include(u =>u.Rol);
        }
    }
}
