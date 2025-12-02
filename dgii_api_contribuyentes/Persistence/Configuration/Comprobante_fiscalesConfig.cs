using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

//Tengo que crear esta clase para cada uno de mis entidades.
namespace Persistence.Configuration
{
    public class Comprobante_fiscalesConfig : IEntityTypeConfiguration<Comprobantes_fiscales>
    {
        public void Configure(EntityTypeBuilder<Comprobantes_fiscales> builder)
        {
            // Nombre de la tabla en SQL Server
            builder.ToTable("comprobantes_fiscales");

            // PRIMARY KEY
            builder.HasKey(p => p.Id);

            // RELACIÓN: Cada comprobante pertenece a un Contribuyente
            builder.HasOne(p => p.Contribuyente)
                .WithMany(c => c.Comprobantes)
                .HasForeignKey(p => p.ContribuyenteId)
                .OnDelete(DeleteBehavior.Cascade);

            // NCF
            builder.Property(p => p.Ncf)
                .HasMaxLength(13)
                .IsRequired();

            // Fecha Emisión
            builder.Property(p => p.FechaEmision)
                .IsRequired();

            // Monto
            builder.Property(p => p.Monto)
                .HasColumnType("decimal(12,2)")     // IMPORTANTE
                .IsRequired();

            // ITBIS (lo calculas en la entidad, pero igual se guarda)
            builder.Property(p => p.Itbis18)
                .HasColumnType("decimal(12,2)");

            // Descripción
            builder.Property(p => p.Descripcion)
                .HasMaxLength(250)
                .IsRequired(false);

            // Auditoría
            builder.Property(p => p.CreatedBy)
                .HasMaxLength(100);

            builder.Property(p => p.LastModifiedBy)
                .HasMaxLength(100);

            // Otros campos de auditoría (tipos)
            builder.Property(p => p.Created)
                .HasColumnType("datetime2");

            builder.Property(p => p.LasModified)
                .HasColumnType("datetime2");
        }
    }
}
