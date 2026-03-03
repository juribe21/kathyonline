using System.ComponentModel.DataAnnotations.Schema;

namespace API.DTOs
{
    public class DetalleVentaDto
    {
        public int Id { get; set; }
        public required int VentaId { get; set; }
        public required int ProductoId { get; set; }
        public required int CategoriaId { get; set; }
        public required int Cantidad { get; set; }        
        public decimal SubTotal { get; set; }
    }
}
