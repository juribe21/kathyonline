using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API.Entities
{
    public class DetalleVenta
    {
        [Key] [Required]
        public int Id { get; set; }
        public required int VentaId { get; set; }
        public required int ProductoId { get; set; }
        public required int CategoriaId { get; set; }
        public required int Cantidad { get; set; }
        public decimal SubTotal { get; set; }

        [JsonIgnore]
        public Venta Venta { get; set; }
    }
}
