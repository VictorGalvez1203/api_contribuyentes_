using Application.DTOs;
using Application.Features.Comprobantes_fiscales.Commands;
using Application.Features.Contribuyentes.Commands;
using Application.Features.Roles_usuario.Commands;
using Application.Features.Tipos_contribuyente.Commands;
using Application.Features.Usuarios.Commands;
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
            CreateMap<roles_usuario, Roles_usuariosDto>();
            CreateMap<tipos_contribuyente, Tipos_contribuyentesDto>();
            CreateMap<usuarios, UsuariosDto>();
            #endregion

            #region Commands
            CreateMap<CreateComprobante_fiscalesCommand, Comprobantes_fiscales>();
            CreateMap<CreateContribuyenteCommand, Contribuyente>();
            CreateMap<CreateRoles_usuarioCommand, roles_usuario>();
            CreateMap<CreateTipos_contribuyenteCommand, tipos_contribuyente>();
            CreateMap<CreateUsuariosCommand, usuarios>();
            #endregion
        }
    }
}
