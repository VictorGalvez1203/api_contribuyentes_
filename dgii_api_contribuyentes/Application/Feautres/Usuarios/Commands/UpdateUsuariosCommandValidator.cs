using Application.Features.Usuarios.Commands;
using FluentValidation;

namespace Application.Feautres.Usuarios.Commands
{
    public class UpdateUsuariosCommandValidator : AbstractValidator<UpdateUsuariosCommand>
    {
        public UpdateUsuariosCommandValidator()
        {
            //ID del contribuyente
            RuleFor(p => p.Id)
                .GreaterThan(0).WithMessage("{PropertyName} debe ser mayor que 0.");

            // Username
            RuleFor(u => u.Username)
                .NotEmpty().WithMessage("{PropertyName} no puede estar vacío.")
                .MaximumLength(100).WithMessage("{PropertyName} no debe exceder de {MaxLength} caracteres.");

            // Password_Hash
            RuleFor(u => u.Password)
                .NotEmpty().WithMessage("{PropertyName} no puede estar vacío.")
                .MinimumLength(8).WithMessage("{PropertyName} debe tener al menos 8 caracteres."); ;

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
