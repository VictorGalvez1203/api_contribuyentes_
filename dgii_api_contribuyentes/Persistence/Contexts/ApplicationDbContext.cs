using Application.Interfaces;
using Domain.Common;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Persistence.Contexts
{
    //Esto se usara en la carpeta Feautres, para la carpeta Commands y Queries, en las clases que estan en esas carpetas.
    public class ApplicationDbContext : DbContext
    {
        private readonly IDateTimeService _dateTime;
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options,IDateTimeService dateTime) : base(options)
        {
            ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
            _dateTime = dateTime;
        }

        public DbSet<Comprobantes_fiscales> ComprobantesFiscales { get; set; }
        public DbSet<Contribuyente> Contribuyentes { get; set; }
        public DbSet<usuarios> Usuarios { get; set; }
        public DbSet<tipos_contribuyente> Tipos_Contribuyentes { get; set; }
        public DbSet<roles_usuario> Roles_Usuarios { get; set; }
        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            foreach(var entry in ChangeTracker.Entries<AuditableBaseEntity>())
            {
                switch(entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.Created = _dateTime.NowUtc;
                        break;
                    case EntityState.Modified:
                        entry.Entity.LasModified = _dateTime.NowUtc;
                        break;
                    default:
                        break;
                        //Falta agregar el usuario que lo creo.
                }
            }
            return base.SaveChangesAsync(cancellationToken);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
