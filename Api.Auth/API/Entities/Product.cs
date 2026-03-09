using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Product
    {
        public required string Id { get; set; } = Guid.NewGuid().ToString();
        public required string ProductName { get; set; }
        public string? ProductImageUrl { get; set; }
        public required string Description { get; set; }

        [Column(TypeName = "decimal(14,2)")]
        public decimal Precio { get; set; }
        public required int Cantidad { get; set; }
        public bool? IsDeleted { get; set; }
        public DateOnly? DateDeleted { get; set; }
        public string? DeletedByUserId { get; set; }

        // Navigation Properties
        [JsonIgnore]
        public Categoria Categoria { get; set; } = null!;
        public string CategoriaId { get; set; } = null!;

        [JsonIgnore]
        public List<ProductPicture> ProductPictures { get; set; } = [];

        [JsonIgnore]
        public List<Pedido> Pedidos { get; set; } = [];

    }
}