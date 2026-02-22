using API.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.DTOs
{
    public class ProductDto
    {
        public string Id { get; set; } 
        public required string ProductName { get; set; }
        public string? ProductImageUrl { get; set; }
        public required string Description { get; set; }
        public decimal Precio { get; set; }
        public required int Cantidad { get; set; }
        public bool? IsDeleted { get; set; }
        public DateOnly? DateDeleted { get; set; }
        public string? DeletedByUserId { get; set; }
        public string CategoriaId { get; set; } = null!;
    }
}
