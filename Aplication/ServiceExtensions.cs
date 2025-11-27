using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace Application
{
    public static class ServiceExtensions
    {
        public static void AddApplicationLayer(this IServiceCollection services)
        {
            // Registra los perfiles de AutoMapper que se encuentren en el ensamblado actual.
            services.AddAutoMapper(Assembly.GetExecutingAssembly());

            // Registra automáticamente todas las clases que implementen validadores de FluentValidation en el ensamblado actual.
            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

            // Registra todos los handlers (manejadores) de MediatR que se encuentren en el mismo ensamblado.
            services.AddMediatR(Assembly.GetExecutingAssembly());
        }
    }
}
