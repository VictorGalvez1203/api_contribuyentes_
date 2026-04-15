
using Application.Features.Tipos_contribuyente.Commands;
using FluentValidation;

namespace Application.Feautres.Tipos_contribuyente.Commands
{
    public class DeleteTipos_contribuyenteCommandValidator : AbstractValidator<DeleteTipos_contribuyenteCommand>
    {
        public DeleteTipos_contribuyenteCommandValidator()
        {
            //ID del Rol Usuario
            RuleFor(p => p.Id)
                .GreaterThan(0).WithMessage("{PropertyName} debe ser mayor que 0.");
        }
    }
}
