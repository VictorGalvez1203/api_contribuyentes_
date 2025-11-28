using MediatR;

namespace Application.Feautres.Contribuyentes.Commands.CreateContribuyenteCommand
{
    public class CreateContribuyenteCommand : IRequest<Wrappers.Response<int>>
    {
    }
}
