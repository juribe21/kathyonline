using System;
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
    public DbSet<Categoria> Categorias { get; set; }
}
