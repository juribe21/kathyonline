using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Entities
{
    public class Venta
    {
        [Key]
        [Required]
        public int Id { get; set; }
        public string ClientId { get; set; } = null!;
        public required int PuntoEntregaId { get; set; }
        public DateOnly FechaEntrega { get; set; }

        [Column(TypeName = "decimal(14,2)")]
        public decimal Total { get; set; }
       
        public string TrnasactionId { get; set; } = null!;

        [JsonIgnore] // 1:N hacia DetalleVentas
        public List<DetalleVenta> DetalleVentas { get; set; } = [];

        [JsonIgnore]
        public Pedido Pedido { get; set; } = null!;
        public int? PedidoId { get; set; }

    }
}
