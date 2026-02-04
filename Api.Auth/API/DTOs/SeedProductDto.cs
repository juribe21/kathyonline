using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs;

public class SeedProductDto
{
    public required string Id { get; set; } = Guid.NewGuid().ToString();
    public required string ProductName { get; set; }
    public string? ProductImageUrl { get; set; }
    public required string Description { get; set; }
    public decimal Precio { get; set; }
    public required int Cantidad { get; set; }
    public string CategoriaId { get; set; } = null!;

}
