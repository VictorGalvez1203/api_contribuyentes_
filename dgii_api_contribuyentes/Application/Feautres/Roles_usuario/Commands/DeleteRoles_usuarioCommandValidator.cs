using Application.Features.Comprobantes_fiscales.Commands;
using FluentValidation;

namespace Application.Feautres.Roles_usuario.Commands
{
    public class DeleteRoles_usuarioCommandValidator : AbstractValidator<DeleteComprobante_fiscalesCommand>
    {
        public DeleteRoles_usuarioCommandValidator()
        {
            //ID del Rol Usuario
            RuleFor(p => p.Id)
                .GreaterThan(0).WithMessage("{PropertyName} debe ser mayor que 0.");
        }
    }
}