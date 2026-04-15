using Application.Interfaces;
using Domain.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Shared.Services
{
    public class JwtService : IJwtService
    {
        private readonly IConfiguration _configuration;

        public JwtService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GenerateToken(usuarios user)
        {
            var jwt = _configuration.GetSection("JWT");

            var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Username!),
            new Claim(JwtRegisteredClaimNames.Email, user.Email ?? ""),
            new Claim("userId", user.Id.ToString()),
            new Claim(ClaimTypes.Role, user.Rol?.NombreRol ?? "User")
        };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwt["Key"]!)
            );

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddMinutes(
                int.Parse(jwt["ExpirationInMinutes"]!)
            );

            var token = new JwtSecurityToken(
                issuer: jwt["Issuer"],
                audience: jwt["Audience"],
                claims: claims,
                expires: expiration,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
