
using Application.Features.Comprobantes_fiscales.Commands;
using Application.Features.Contribuyentes.Commands;
using AutoMapper;
using Domain.Entities;

namespace Application.Mappings
{
    public class GeneralProfile : Profile
    {
        public GeneralProfile()
        {
            #region Commands
            CreateMap<CreateComprobante_fiscalesCommand, Comprobantes_fiscales>();
            CreateMap<CreateContribuyenteCommand, Contribuyente>();
            #endregion
        }
    }
}
