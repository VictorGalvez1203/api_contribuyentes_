using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration
{
    public class RolesUsuarioConfig : IEntityTypeConfiguration<roles_usuario>
    {
        public void Configure(EntityTypeBuilder<roles_usuario> builder)
        {
            builder.ToTable("roles_usuario");

            builder.HasKey(r => r.Id);

            builder.Property(r => r.NombreRol)
                .HasMaxLength(20)
                .IsRequired();

            builder.Property(p => p.CreatedBy).HasMaxLength(100);
            builder.Property(p => p.LastModifiedBy).HasMaxLength(100);
            builder.Property(p => p.Created).HasColumnType("datetime2");
            builder.Property(p => p.LasModified).HasColumnType("datetime2");
        }
    }
}
