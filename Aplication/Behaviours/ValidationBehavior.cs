using FluentValidation;
using MediatR;

namespace Application.Behaviours
{
    public class ValidationBehavior<TRequest, TResponses> : IPipelineBehavior<TRequest, TResponses> where TRequest : IRequest<TResponses>
    {
        private readonly IEnumerable<IValidator<TRequest>> _validators;

        public ValidationBehavior(IEnumerable<IValidator<TRequest>> validators)
        {
            _validators = validators;
        }

        public async Task<TResponses> Handle(TRequest request, RequestHandlerDelegate<TResponses> next, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
