
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Entities;

public class Client
{
    [Key]
    public required string Id { get; set; } //= Guid.NewGuid().ToString();
    public required string Name { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public required string Telefono { get; set; }
    public required int Gender { get; set; }
    public DateOnly DateOfBirth { get; set; }
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public DateTime LastActive { get; set; } = DateTime.UtcNow;
    public string? Description { get; set; }
    public required string City { get; set; }
    public required string Country { get; set; }
    public string? ImageUrl { get; set; }


    // Navigation Propperties
    [JsonIgnore]
    public List<Photo> Photos { get; set; } = [];

    [JsonIgnore]
    [ForeignKey(nameof(Id))]
    public AppUser User { get; set; } = null!;

    [JsonIgnore]
    public List<Pedido> Pedidos { get; set; } = [];

    // [JsonIgnore]
    // public List<Venta> Ventas { get; set; } = [];
}
