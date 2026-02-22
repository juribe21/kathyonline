using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Entities
{
    public class Pedido
    {
        [Key]
        public int Id { get; set; }
        public required int ClientId { get; set; }
        public required int PuntoEntregaId { get; set; }
        public DateOnly FechaEntrega { get; set; }
        public required int ProductoId { get; set; }
        public required int CategoriaId { get; set; }
        public required int Cantidad { get; set; }
        [Column(TypeName = "decimal(14,2)")]
        public decimal SubTotal { get; set; }


        [JsonIgnore] // 1:N hacia Ventas
        public List<Venta> Ventas { get; set; } = [];

    }
}