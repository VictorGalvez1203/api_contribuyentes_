
using Ardalis.Specification;
using Domain.Entities;

namespace Application.Specifications
{
    public class GetContribuyenteByRncCedulaSpecification : Specification<Contribuyente>
    {
        public GetContribuyenteByRncCedulaSpecification(string rncCedula)
        {
            Query.Where(c => c.RncCedula == rncCedula);
        }
    }
}
