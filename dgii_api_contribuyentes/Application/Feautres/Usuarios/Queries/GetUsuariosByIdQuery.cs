using Application.DTOs;
using Application.Interfaces;
using Application.Wrappers;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.Usuarios.Queries
{
    public class GetUsuariosByIdQuery : IRequest<Response<UsuariosDto>>
    {
        public int Id { get; set; }
    }

    public class GetUsuariosByIdQueryHandler : IRequestHandler<GetUsuariosByIdQuery, Response<UsuariosDto>>
    {
        private readonly IRepositoryAsync<usuarios> _repositoryAsync;
        private readonly IMapper _mapper;

        public GetUsuariosByIdQueryHandler(IRepositoryAsync<usuarios> repositoryAsync, IMapper mapper)
        {
            _repositoryAsync = repositoryAsync;
            _mapper = mapper;
        }

        public async Task<Response<UsuariosDto>> Handle(GetUsuariosByIdQuery request, CancellationToken cancellationToken)
        {
            var usuarios = await _repositoryAsync.GetByIdAsync(request.Id);

            if (usuarios == null)
            {
                throw new KeyNotFoundException($"Registro no encontrado con el id {request.Id}");
            }
            else
            {
                var dto = _mapper.Map<UsuariosDto>(usuarios);
                return new Response<UsuariosDto>(dto);
            }
        }
    }
}
