
using Application.Features.Comprobantes_fiscales.Commands;
using FluentValidation;

namespace Application.Feautres.Comprobantes_fiscales.Commands
{
    public class UpdateComprobante_fiscalesCommandValidator : AbstractValidator<UpdateComprobante_fiscalesCommand>
    {
        public UpdateComprobante_fiscalesCommandValidator()
        {
            // ID del registro
            RuleFor(p => p.Id)
                .GreaterThan(0).WithMessage("{PropertyName} debe ser mayor que 0.")
                .NotEmpty().WithMessage("{PropertyName} no puede ser vacío.");

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

            // Descripción — opcional pero limitada
            RuleFor(p => p.Descripcion)
                .MaximumLength(250)
                .WithMessage("{PropertyName} no debe exceder de {MaxLength} caracteres.");

        }
    }
}
