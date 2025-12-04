using Application.Behaviours;
using Application.Features.Contribuyentes.Commands;
using AutoMapper;
using FluentValidation;
using MediatR;
using MediatR.Registration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace Application
{
    //Esto son configuraciones basicas, para la plantilla.
    //Se utiliza para agrupar las inyección o matricula de nuestros servicios hecho por nosotros mismo.
    public static class ServiceExtensions
    {
        //No olvidarse que este AddApplicationLayer, se debe de colocar en el Program.cs de la capa Presentation.
        //Esto es lo primero que hago despues de descargar los paqutes iniciales.
        //Se declara como builder.Services.AddApplicationLayer();
        public static void AddApplicationLayer(this IServiceCollection services)
        {
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

            //services.AddMediatR(typeof(ServiceExtensions).Assembly);

            services.AddMediatR(Assembly.GetExecutingAssembly());


            services.AddTransient(typeof(IPipelineBehavior<,>),typeof(ValidationBehavior<,>));
        }
    }
} 