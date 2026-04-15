using FluentValidation;

namespace Application.Features.Contribuyentes.Commands
{
    public class CreateContribuyenteCommandValidator : AbstractValidator<CreateContribuyenteCommand>
    {
        public CreateContribuyenteCommandValidator()
        {
            // FirstName
            RuleFor(p => p.FistName)
                .NotEmpty().WithMessage("{PropertyName} no puede estar vacío.")
                .MaximumLength(100).WithMessage("{PropertyName} no debe exceder de {MaxLength} caracteres.");

            // LastName
            RuleFor(p => p.LastName)
                .NotEmpty().WithMessage("{PropertyName} no puede estar vacío.")
                .MaximumLength(100).WithMessage("{PropertyName} no debe exceder de {MaxLength} caracteres.");

            // RNC o Cédula→ formato: 001-0000000-1
            RuleFor(p => p.RncCedula)
                .NotEmpty().WithMessage("{PropertyName} no puede estar vacío.")
                .Matches(@"^\d{3}-\d{7}-\d{1}$")
                .WithMessage("{PropertyName} debe tener el formato 000-0000000-0.");

            // TipoContribuyenteId
            RuleFor(p => p.TipoContribuyenteId)
                .GreaterThan(0).WithMessage("{PropertyName} es obligatorio.");

            // Status
            RuleFor(p => p.Status)
                .NotEmpty().WithMessage("{PropertyName} no puede estar vacío.")
                .Must(s => s == "Activo" || s == "Inactivo")
                .WithMessage("{PropertyName} debe ser 'Activo' o 'Inactivo'.");

            // Teléfono → formato: 000-000-0000
            RuleFor(p => p.Numberphone)
                .NotEmpty().WithMessage("{PropertyName} no puede estar vacío.")
                .Matches(@"^\d{3}-\d{3}-\d{4}$")
                .WithMessage("{PropertyName} debe tener el formato 000-000-0000.");

            // Email
            RuleFor(p => p.Email)
                .NotEmpty().WithMessage("{PropertyName} no puede estar vacío.")
                .EmailAddress().WithMessage("{PropertyName} debe ser un correo válido.")
                .MaximumLength(150).WithMessage("{PropertyName} no debe exceder de {MaxLength} caracteres.");

            // Address
            RuleFor(p => p.Address)
                .NotEmpty().WithMessage("{PropertyName} no puede estar vacío.")
                .MaximumLength(250).WithMessage("{PropertyName} no debe exceder de {MaxLength} caracteres.");
        }
    }
}
