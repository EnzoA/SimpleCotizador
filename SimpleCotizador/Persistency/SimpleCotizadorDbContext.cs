using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SimpleCotizador.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleCotizador.Persistency
{
    public class SimpleCotizadorDbContext : IdentityDbContext<SimpleCotizadorUser>
    {
        #region Propiedades públicas

        public DbSet<Cotizacion> Cotizaciones => Set<Cotizacion>();

        #endregion

        #region Constructores

        public SimpleCotizadorDbContext(DbContextOptions<SimpleCotizadorDbContext> options) : base(options)
        {

        }

        #endregion

        #region Métodos privados y protegidos

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            var cotizacionEntity = builder.Entity<Cotizacion>();

            cotizacionEntity.ToTable("Cotizaciones")
                            .HasKey(c => c.Id);

            cotizacionEntity.Property(c => c.Id)
                            .IsRequired()
                            .HasColumnName("Id");

            cotizacionEntity.Property(c => c.NombreCliente)
                            .HasColumnName("Cliente")
                            .IsRequired()
                            .HasMaxLength(350);

            cotizacionEntity.Property(c => c.TipoSeguro)
                            .HasColumnName("TipoSeguro")
                            .IsRequired()
                            .HasMaxLength(50);

            cotizacionEntity.Property(c => c.FormaPago)
                            .HasColumnName("FormaPago")
                            .IsRequired()
                            .HasMaxLength(50);

            cotizacionEntity.Property(c => c.FechaVencimiento)
                            .HasColumnName("FechaVencimiento")
                            .IsRequired();

            cotizacionEntity.Property(c => c.FechaCotizacion)
                            .HasColumnName("FechaCotizacion")
                            .IsRequired();

            cotizacionEntity.Property(c => c.Activa)
                            .HasColumnName("Activa")
                            .IsRequired();

            cotizacionEntity.Property(c => c.NumeroPoliza)
                            .HasColumnName("NumeroPoliza")
                            .IsRequired()
                            .HasMaxLength(50);
        }

        #endregion
    }
}
