using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration
{
    public class ContribuyenteConfig : IEntityTypeConfiguration<Contribuyente>
    {
        public void Configure(EntityTypeBuilder<Contribuyente> builder)
        {
            builder.ToTable("contribuyentes");

            builder.HasKey(p => p.Id);

            builder.Property(p => p.Name)
                .HasMaxLength(100)
                .IsRequired();

            builder.Property(p => p.Lastname)
                .HasMaxLength(100);

            builder.Property(p => p.RncCedula)
                .HasMaxLength(20)
                .IsRequired();

            builder.Property(p => p.Status)
                .HasMaxLength(20)
                .IsRequired();

            builder.Property(p => p.Numberphone)
                .HasMaxLength(30);

            builder.Property(p => p.Email)
                .HasMaxLength(150);

            builder.Property(p => p.Address)
                .HasMaxLength(250);

            // RELACIÓN CON tipos_contribuyente
            builder.HasOne(c => c.TipoContribuyente)
                .WithMany(t => t.Contribuyentes)
                .HasForeignKey(c => c.TipoContribuyenteId)
                .OnDelete(DeleteBehavior.Restrict); // o Cascade si deseas

            // Auditoría
            builder.Property(p => p.CreatedBy).HasMaxLength(100);
            builder.Property(p => p.LastModifiedBy).HasMaxLength(100);
            builder.Property(p => p.Created).HasColumnType("datetime2");
            builder.Property(p => p.LasModified).HasColumnType("datetime2");
        }
    }
}
