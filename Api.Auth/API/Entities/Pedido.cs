using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Entities
{
    public class Pedido
    {
        [Key]
        public int Id { get; set; }
        public required string ClientId { get; set; }
        public required int PuntoEntregaId { get; set; }
        public DateOnly FechaPedido { get; set; }
        public required string ProductoId { get; set; }
        public required string CategoriaId { get; set; }
        public required int Cantidad { get; set; }
        [Column(TypeName = "decimal(14,2)")]
        public decimal SubTotal { get; set; }
        public string? TransactionId { get; set; }
        public int Status { get; set; }


        [JsonIgnore] // 1:N hacia Ventas
        public List<Venta> Ventas { get; set; } = [];

    }
}