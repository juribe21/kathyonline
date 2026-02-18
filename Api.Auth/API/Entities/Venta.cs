using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API.Entities
{
    public class Venta
    {
        [Key]
        public int Id { get; set; }
        public required int ClientId { get; set; }        
        public int EntregaId { get; set; }
        public DateOnly FechaEntrega { get; set; }
        public decimal Total { get; set; }

        [JsonIgnore]
        public List<DetalleVenta> DetalleVentas { get; set; } = [];
    }
}
