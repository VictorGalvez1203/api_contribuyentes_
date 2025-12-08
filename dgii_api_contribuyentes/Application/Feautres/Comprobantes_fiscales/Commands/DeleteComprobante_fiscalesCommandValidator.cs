
using Application.Features.Comprobantes_fiscales.Commands;
using FluentValidation;

namespace Application.Feautres.Comprobantes_fiscales.Commands
{
    public class DeleteComprobante_fiscalesCommandValidator : AbstractValidator<DeleteComprobante_fiscalesCommand>
    {
        public DeleteComprobante_fiscalesCommandValidator()
        {
            //ID del Comprobante Fiscal
            RuleFor(p => p.Id)
                .GreaterThan(0).WithMessage("{PropertyName} debe ser mayor que 0.");
        }
    }
}
