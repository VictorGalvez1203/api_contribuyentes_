using Application.DTOs;
using Application.Features.Comprobantes_fiscales.Commands;
using Application.Features.Contribuyentes.Commands;
using Application.Features.Roles_usuario.Commands;
using AutoMapper;
using Domain.Entities;

namespace Application.Mappings
{
    public class GeneralProfile : Profile
    {
        public GeneralProfile()
        {
            #region Dtos
            CreateMap<Comprobantes_fiscales, ComprobantesFiscalesDto>();
            CreateMap<Contribuyente, ContribuyentesDto>();
            #endregion

            #region Commands
            CreateMap<CreateComprobante_fiscalesCommand, Comprobantes_fiscales>();
            CreateMap<CreateContribuyenteCommand, Contribuyente>();
            CreateMap<CreateRoles_usuarioCommand, roles_usuario>();
            #endregion
        }
    }
}
