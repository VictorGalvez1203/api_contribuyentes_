using FluentValidation;

namespace Application.Features.Comprobantes_fiscales.Commands
{
    public class CreateComprobante_fiscalesCommandValidator : AbstractValidator <CreateComprobante_fiscalesCommand>
    {
        public CreateComprobante_fiscalesCommandValidator()
        {
            // ID del Contribuyente
            RuleFor(p => p.ContribuyenteId)
                .GreaterThan(0).WithMessage("{PropertyName} debe ser mayor que 0.")
                .NotEmpty().WithMessage("{PropertyName} no puede ser vacío.");

            // NCF
            RuleFor(p => p.Ncf)
                .NotEmpty().WithMessage("{PropertyName} no puede ser vacío.")
                .Length(1, 13).WithMessage("{PropertyName} no debe exceder de {MaxLength} caracteres.");

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
