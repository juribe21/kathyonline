using System.ComponentModel.DataAnnotations.Schema;

namespace API.DTOs
{
    public class VentaDto
    {
        public int Id { get; set; }
        public required string NombreClient { get; set; }
        public required string PuntoEntrega { get; set; }
        public string Productos { get; set; } = null!;
        public DateOnly FechaEntrega { get; set; }        
        public decimal Total { get; set; }
        
        //public int PedidoId { get; set; }
    }
}
