using Application.Features.Usuarios.Commands;
using FluentValidation;

namespace Application.Feautres.Usuarios.Commands
{
    public class CreateUsuariosCommandValidator : AbstractValidator<CreateUsuariosCommand>
    {
        public CreateUsuariosCommandValidator()
        {
            // Username
            RuleFor(u => u.Username)
                .NotEmpty().WithMessage("{PropertyName} no puede estar vacío.")
                .MaximumLength(100).WithMessage("{PropertyName} no debe exceder de {MaxLength} caracteres.");

            // Password_Hash (debe venir como byte[] y obligatorio)
            RuleFor(u => u.Password_Hash)
                .NotEmpty().WithMessage("{PropertyName} no puede estar vacío.")
                .Must(p => p.Length > 0).WithMessage("{PropertyName} es obligatorio.");

            // Email
            RuleFor(u => u.Email)
                .NotEmpty().WithMessage("{PropertyName} no puede estar vacío.")
                .EmailAddress().WithMessage("{PropertyName} debe ser un correo válido.")
                .MaximumLength(150).WithMessage("{PropertyName} no debe exceder de {MaxLength} caracteres.");

            // Estado (Activo / Inactivo)
            RuleFor(u => u.Estado)
                .NotEmpty().WithMessage("{PropertyName} no puede estar vacío.")
                .Must(e => e == "Activo" || e == "Inactivo")
                .WithMessage("{PropertyName} debe ser 'Activo' o 'Inactivo'.")
                .MaximumLength(10).WithMessage("{PropertyName} no debe exceder de {MaxLength} caracteres.");

            // Rol_Id (FK obligatoria)
            RuleFor(u => u.Rol_Id)
                .GreaterThan(0).WithMessage("Debe especificar un rol válido.");
        }
    }
}
