using MediatR;

namespace Application.Feautres.Contribuyentes.Commands
{
    public class CreateContribuyenteCommand : IRequest<Wrappers.Response<int>>
    {
    }
}
