using FluentValidation;

namespace Application.Features.Comprobantes_fiscales.Commands
{
    public class CreateComprobante_fiscalesCommandValidator : AbstractValidator <CreateComprobante_fiscalesCommand>
    {
        public CreateComprobante_fiscalesCommandValidator()
        {
            // NCF
            RuleFor(p => p.Ncf)
                .NotEmpty().WithMessage("{PropertyName} no puede ser vacío.")
                .Length(1, 13).WithMessage("{PropertyName} no debe exceder de {MaxLength} caracteres.");

            // Fecha de emisión
            RuleFor(p => p.Fecha_Emision)
                .NotEmpty().WithMessage("Fecha de nacimiento no puede ser vacío.")
                .LessThanOrEqualTo(DateTime.Now)
                .WithMessage("{PropertyName} no puede ser una fecha futura.");

            // Monto
            RuleFor(p => p.Monto)
                .GreaterThan(0).WithMessage("{PropertyName} debe ser mayor que 0.")
                .NotEmpty().WithMessage("{PropertyName} no puede ser vacío.");

            // Descripción — opcional, pero limitada
            RuleFor(p => p.Descripcion)
                .MaximumLength(250)
                .WithMessage("{PropertyName} no debe exceder de {MaxLength} caracteres.");
        }
    }
}
