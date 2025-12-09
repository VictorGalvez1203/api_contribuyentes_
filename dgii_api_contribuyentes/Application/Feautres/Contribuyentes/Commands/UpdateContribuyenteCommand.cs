using Application.Interfaces;
using Application.Wrappers;
using MediatR;

namespace Application.Features.Contribuyentes.Commands
{
    public class UpdateContribuyenteCommand : IRequest<Response<int>>
    {
        public int Id { get; set; }
        public string? FistName { get; set; }
        public string? LastName { get; set; }
        public string? RncCedula { get; set; }
        public int TipoContribuyenteId { get; set; }
        public string? Status { get; set; }
        public string? Numberphone { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }
    }

    public class UpdateContribuyenteCommandHandler : IRequestHandler<UpdateContribuyenteCommand, Response<int>>
    {
        private readonly IRepositoryAsync<Domain.Entities.Contribuyente> _repositoryAsync;

        public UpdateContribuyenteCommandHandler(IRepositoryAsync<Domain.Entities.Contribuyente> repositoryAsync)
        {
            _repositoryAsync = repositoryAsync;
        }

        public async Task<Response<int>> Handle(UpdateContribuyenteCommand request, CancellationToken cancellationToken)
        {
            var contribuyente = await _repositoryAsync.GetByIdAsync(request.Id);

            if (contribuyente == null)
            {
                throw new KeyNotFoundException($"Registro no encontrado con el id {request.Id}");
            }
            else
            {
                contribuyente.Id = request.Id;
                contribuyente.FistName = request.FistName;
                contribuyente.LastName = request.LastName;
                contribuyente.RncCedula = request.RncCedula;
                contribuyente.TipoContribuyenteId = request.TipoContribuyenteId;
                contribuyente.Status = request.Status;
                contribuyente.Numberphone = request.Numberphone;
                contribuyente.Email = request.Email;
                contribuyente.Address = request.Address;

                await _repositoryAsync.UpdateAsync(contribuyente);

                return new Response<int>(contribuyente.Id);
            }
        }
    }
}
