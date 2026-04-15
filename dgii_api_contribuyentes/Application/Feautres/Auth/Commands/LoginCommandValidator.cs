using FluentValidation;

namespace Application.Feautres.Auth.Commands
{
    public class LoginCommandValidator : AbstractValidator<LoginCommand>
    {
        public LoginCommandValidator()
        {
            // Email
            RuleFor(u => u.Email)
                .NotEmpty().WithMessage("{PropertyName} no puede estar vacío.")
                .EmailAddress().WithMessage("{PropertyName} debe ser un correo válido.")
                .MaximumLength(150).WithMessage("{PropertyName} no debe exceder de {MaxLength} caracteres.");

            // Password
            RuleFor(u => u.Password)
                .NotEmpty().WithMessage("{PropertyName} no puede estar vacío.")
                .MinimumLength(8).WithMessage("{PropertyName} debe tener al menos 8 caracteres.");
        }
    }
}
