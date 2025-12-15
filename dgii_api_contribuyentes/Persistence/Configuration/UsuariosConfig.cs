using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration
{
    public class UsuariosConfig : IEntityTypeConfiguration<usuarios>
    {
        public void Configure(EntityTypeBuilder<usuarios> builder)
        {
            builder.ToTable("usuarios");

            builder.HasKey(u => u.Id);

            builder.Property(u => u.Username)
                .HasMaxLength(100)
                .IsRequired();

            builder.Property(u => u.Password_Hash)
                .HasColumnType("nvarchar(max)")
                .IsRequired();

            builder.Property(u => u.Email)
                .HasMaxLength(150)
                .IsRequired();
            builder.HasIndex(u => u.Email)
                .IsUnique();

            builder.Property(u => u.Estado)
                .HasMaxLength(10)
                .IsRequired();

            // RELACIÓN CON roles_usuario
            builder.HasOne(u => u.Rol)
                .WithMany(r => r.Usuarios)
                .HasForeignKey(u => u.Rol_Id)
                .OnDelete(DeleteBehavior.Restrict);

            // Auditoría
            builder.Property(p => p.CreatedBy).HasMaxLength(100);
            builder.Property(p => p.LastModifiedBy).HasMaxLength(100);
            builder.Property(p => p.Created).HasColumnType("datetime2");
            builder.Property(p => p.LasModified).HasColumnType("datetime2");
        }
    }
}
