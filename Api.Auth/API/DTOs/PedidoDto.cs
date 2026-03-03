using API.Entities;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class Pedido
    {
        public int Id { get; set; }
        public required int ClientId { get; set; }
        public required int PuntoEntregaId { get; set; }
        public DateOnly FechaEntrega { get; set; }
        public required int ProductoId { get; set; }
        public required int CategoriaId { get; set; }
        public required int Cantidad { get; set; }        
        public decimal SubTotal { get; set; }
        public int TransactionId { get; set; }

    }
}
