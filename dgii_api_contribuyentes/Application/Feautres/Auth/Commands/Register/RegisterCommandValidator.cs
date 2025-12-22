using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feautres.Auth.Commands.Register
{
    public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
    {
        public RegisterCommandValidator()
        {
            RuleFor(u => u.Username)
                 .NotEmpty().WithMessage("{PropertyName} no puede estar vacío.")
                 .MaximumLength(100).WithMessage("{PropertyName} no debe exceder de {MaxLength} caracteres.");

            RuleFor(u => u.Email)
                .NotEmpty().WithMessage("{PropertyName} no puede estar vacío.")
                .EmailAddress().WithMessage("{PropertyName} debe ser un correo válido.")
                .MaximumLength(150).WithMessage("{PropertyName} no debe exceder de {MaxLength} caracteres.");

            RuleFor(u => u.Password)
                .NotEmpty().WithMessage("{PropertyName} no puede estar vacío.")
                .MinimumLength(8).WithMessage("{PropertyName} debe tener al menos 8 caracteres.");
        }
    }
}
