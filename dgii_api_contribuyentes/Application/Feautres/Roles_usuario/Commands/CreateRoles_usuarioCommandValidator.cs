
using Application.Features.Roles_usuario.Commands;
using FluentValidation;

namespace Application.Feautres.Roles_usuario.Commands
{
    public class CreateRoles_usuarioCommandValidator : AbstractValidator<CreateRoles_usuarioCommand>
    {
        public CreateRoles_usuarioCommandValidator()
        {
            RuleFor(p => p.NombreRol)
                .NotEmpty().WithMessage("{PropertyName} no puede estar vacío.")
                .MaximumLength(20).WithMessage("{PropertyName} no debe exceder de {MaxLength} caracteres.");
        }
    }
}
