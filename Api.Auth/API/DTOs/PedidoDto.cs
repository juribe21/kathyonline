using API.Entities;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class PedidoDto
    {
        public int Id { get; set; }
        public required string ClientId { get; set; }
        public required int PuntoEntregaId { get; set; }
        public DateOnly FechaPedido { get; set; }
        public required string ProductoId { get; set; }
        public required string CategoriaId { get; set; }
        public required int Cantidad { get; set; }        
        public decimal SubTotal { get; set; }
        public string? TransactionId { get; set; }
        public int Status { get; set; }

    }
}
