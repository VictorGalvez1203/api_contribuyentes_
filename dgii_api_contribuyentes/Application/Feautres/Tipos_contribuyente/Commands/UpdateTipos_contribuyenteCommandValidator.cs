
using Application.Features.Tipos_contribuyente.Commands;
using FluentValidation;

namespace Application.Feautres.Tipos_contribuyente.Commands
{
    public class UpdateTipos_contribuyenteCommandValidator : AbstractValidator<UpdateTipos_contribuyenteCommand>
    {
        public UpdateTipos_contribuyenteCommandValidator()
        {
            RuleFor(r => r.Id)
                .GreaterThan(0)
                .WithMessage("El {PropertyName} debe ser mayor que {MaxLength}.");

            RuleFor(r => r.Tipo)
                .NotEmpty().WithMessage("{PropertyName} no puede estar vacío.")
                .MaximumLength(20).WithMessage("{PropertyName} no debe exceder {MaxLength} caracteres.");
        }
    }
}
