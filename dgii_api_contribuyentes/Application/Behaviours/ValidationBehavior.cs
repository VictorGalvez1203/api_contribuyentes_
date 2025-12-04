using FluentValidation;
using MediatR;

namespace Application.Behaviours
{
    //Esto son configuraciones basicas, para la plantilla.
    //Esta clase tiene como proposito validar los datos antes de ejecutar cualquier lógica, o sea subir a la base de datos o cualquier otro cosa.
    //O sea esto entra antes de llegar a la logica de negocios, cuando pase alguna excepción con algunos de los datos.
    //Esto va antes que lo que hay en la carpeta Exceptions, que se implemetara en la clase ValidationException.cs.
    public class ValidationBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse> where TRequest : IRequest<TResponse>
    {
        private readonly IEnumerable<IValidator<TRequest>> _validators;

        public ValidationBehavior(IEnumerable<IValidator<TRequest>> validators)
        {
            _validators = validators;
        }

        public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            if (_validators.Any())
            {
                var context = new FluentValidation.ValidationContext<TRequest>(request);
                var validationResults = await Task.WhenAll(_validators.Select(v => v.ValidateAsync(context, cancellationToken)));
                var failures = validationResults.SelectMany(r => r.Errors).Where(f => f != null).ToList();

                if (failures.Count != 0)
                {
                    throw new Exceptions.ValidationException(failures);
                }
            }
            return await next();
        }

        //public async Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate<TResponse> next)
        //{
        //    if (_validators.Any())
        //    {
        //        var context = new FluentValidation.ValidationContext<TRequest>(request);
        //        var validationResults = await Task.WhenAll(_validators.Select(v => v.ValidateAsync(context, cancellationToken)));
        //        var failures = validationResults.SelectMany(r => r.Errors).Where(f => f != null).ToList();

        //        if (failures.Count != 0)
        //        {
        //            throw new Exceptions.ValidationException(failures);
        //        }
        //    }
        //    return await next();
        //}
    }
}
