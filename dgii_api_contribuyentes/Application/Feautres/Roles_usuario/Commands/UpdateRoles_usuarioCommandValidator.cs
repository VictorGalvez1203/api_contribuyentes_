
using Application.Features.Roles_usuario.Commands;
using FluentValidation;

namespace Application.Feautres.Roles_usuario.Commands
{
    public class UpdateRoles_usuarioCommandValidator : AbstractValidator<UpdateRoles_usuarioCommand>
    {
        public UpdateRoles_usuarioCommandValidator()
        {
            RuleFor(r => r.Id)
                .GreaterThan(0)
                .WithMessage("El {PropertyName} debe ser mayor que {MaxLength}.");

            RuleFor(r => r.NombreRol)
                .NotEmpty().WithMessage("{PropertyName} no puede estar vacío.")
                .MaximumLength(20).WithMessage("{PropertyName} no debe exceder {MaxLength} caracteres.");
        }

    }
}
