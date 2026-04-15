using Application.Features.Usuarios.Commands;
using FluentValidation;

namespace Application.Feautres.Usuarios.Commands
{
    public class DeleteUsuariosCommandValidator : AbstractValidator<DeleteUsuariosCommand>
    {
        public DeleteUsuariosCommandValidator()
        {
            //ID del contribuyente
            RuleFor(p => p.Id)
                .GreaterThan(0).WithMessage("{PropertyName} debe ser mayor que 0.");
        }
    }
}
