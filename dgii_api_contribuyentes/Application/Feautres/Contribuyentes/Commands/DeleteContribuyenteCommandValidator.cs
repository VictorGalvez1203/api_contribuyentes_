

using Application.Features.Contribuyentes.Commands;
using FluentValidation;

namespace Application.Feautres.Contribuyentes.Commands
{
    public class DeleteContribuyenteCommandValidator : AbstractValidator<DeleteContribuyenteCommand>
    {
        public DeleteContribuyenteCommandValidator()
        {
            //ID del contribuyente
            RuleFor(p => p.Id)
                .GreaterThan(0).WithMessage("{PropertyName} debe ser mayor que 0.");
        }
    }
}
