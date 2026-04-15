using Application.Features.Contribuyentes.Commands;
using FluentValidation;

namespace Application.Feautres.Contribuyentes.Commands
{
    public class UpdateContribuyenteCommandValidator : AbstractValidator<UpdateContribuyenteCommand>
    {
        public UpdateContribuyenteCommandValidator()
        {
            RuleFor(p => p.Id)
                   .GreaterThan(0).WithMessage("El {PropertyName} debe ser un valor mayor que {MaxLength}.");

            RuleFor(p => p.FistName)
                .NotEmpty().WithMessage("{PropertyName} no puede estar vacío.")
                .MaximumLength(100).WithMessage("El {PropertyName} no puede exceder {MaxLength} caracteres.");

            RuleFor(p => p.LastName)
                .NotEmpty().WithMessage("{PropertyName} no puede estar vacío.")
                .MaximumLength(100).WithMessage("El {PropertyName} no puede exceder {MaxLength} caracteres.");

            RuleFor(p => p.RncCedula)
                .NotEmpty().WithMessage("{PropertyName} no puede estar vacío.")
                .MaximumLength(20).WithMessage("El {PropertyName} no puede exceder {MaxLength} caracteres.");

            RuleFor(p => p.TipoContribuyenteId)
                .GreaterThan(0).WithMessage("Debe seleccionar un tipo de contribuyente válido.");

            RuleFor(p => p.Status)
                .NotEmpty().WithMessage("{PropertyName} no puede estar vacío.")
                .MaximumLength(20).WithMessage("El {PropertyName} no puede exceder {MaxLength} caracteres.");

            RuleFor(p => p.Numberphone)
                .NotEmpty().WithMessage("{PropertyName} no puede estar vacío.")
                .Matches(@"^\d{3}-\d{3}-\d{4}$").WithMessage("{PropertyName} debe cumplir el formato 000-000-0000")
                .MaximumLength(12).WithMessage("{PropertyName} no debe exceder de {MaxLength} caracteres.");

            RuleFor(p => p.Email)
                .NotEmpty().WithMessage("{PropertyName} no puede estar vacío.")
                .EmailAddress().WithMessage("El formato del {PropertyName} no es válido.")
                .MaximumLength(150).WithMessage("El {PropertyName} no puede exceder {MaxLength} caracteres.");

            RuleFor(p => p.Address)
                .NotEmpty().WithMessage("{PropertyName} no puede estar vacío.")
                .MaximumLength(250).WithMessage("La {PropertyName} no puede exceder {MaxLength} caracteres.");
        }
        
    }
}

