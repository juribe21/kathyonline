using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<AppUser> AppUsers { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Client> Clients { get; set; }
    public DbSet<Gender> Genders { get; set; }
    public DbSet<UserType> UserTypes { get; set; }
    public DbSet<Photo> Photos { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<ProductPicture> ProductPictures { get; set; }
    public DbSet<Categoria> Categorias { get; set; }
    public DbSet<Venta> Ventas { get; set; }
    public DbSet<DetalleVenta> DetalleVentas { get; set; }
    public DbSet<Pedido> Pedidos { get; set; }
    public DbSet<PuntoEntrega> PuntosEntrega { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Source - https://stackoverflow.com/a/63313616
        // Posted by Ivan Stoev, modified by community. See post 'Timeline' for change history
        // Retrieved 2026-02-21, License - CC BY-SA 4.0

        //modelBuilder.Entity<Venta>()
        //    .HasOne(e => e.PuntosEntrega)
        //    .WithMany()
        //    .OnDelete(DeleteBehavior.Cascade); // <--

        // modelBuilder.Entity<Pedido>()
        //     .HasOne(e => e.PuntosEntrega)
        //     .WithMany()
        //     .OnDelete(DeleteBehavior.Cascade); // <--

    }
}
