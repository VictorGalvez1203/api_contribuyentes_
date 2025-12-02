using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration
{
    public class Tipos_contribuyenteConfig : IEntityTypeConfiguration<tipos_contribuyente>
    {
        public void Configure(EntityTypeBuilder<tipos_contribuyente> builder)
        {
            // Nombre de la tabla en SQL Server
            builder.ToTable("tipos_contribuyente");

            builder.HasKey(p => p.Id);

            builder.Property(p => p.Tipo)
                .HasMaxLength(50)
                .IsRequired();

            builder.Property(p => p.CreatedBy).HasMaxLength(100);
            builder.Property(p => p.LastModifiedBy).HasMaxLength(100);
            builder.Property(p => p.Created).HasColumnType("datetime2");
            builder.Property(p => p.LasModified).HasColumnType("datetime2");
        }
    }
}
