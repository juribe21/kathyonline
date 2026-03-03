using System.ComponentModel.DataAnnotations.Schema;

namespace API.DTOs
{
    public class VentaDto
    {
        public int Id { get; set; }
        public required int ClientId { get; set; }
        public required int PuntoEntregaId { get; set; }
        public DateOnly FechaEntrega { get; set; }        
        public decimal Total { get; set; }
        public int PedidoId { get; set; }
    }
}
