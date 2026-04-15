using Application.Features.Tipos_contribuyente.Commands;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feautres.Tipos_contribuyente.Commands
{
    internal class CreateTipos_contribuyenteCommandValidator : AbstractValidator<CreateTipos_contribuyenteCommand>
    {
        public CreateTipos_contribuyenteCommandValidator()
        {
            RuleFor(p => p.Tipo)
                .NotEmpty().WithMessage("{PropertyName} no puede estar vacío.")
                .MaximumLength(20).WithMessage("{PropertyName} no debe exceder de {MaxLength} caracteres.");
        }
    }
}
