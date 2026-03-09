using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Entities
{
    public class DetalleVenta
    {
        [Key] [Required]
        public int Id { get; set; }
        public required int VentaId { get; set; }
        public required string ProductoId { get; set; }
        public required string CategoriaId { get; set; }
        public required int Cantidad { get; set; }
        [Column(TypeName = "decimal(14,2)")]
        public decimal SubTotal { get; set; }

        [JsonIgnore]
        public Venta Venta { get; set; } = null!;
    }
}
