namespace API.DTOs
{
    public class PedidoCarritoUpdate
    {
        public int Id { get; set; }
        public int Status { get; set; }
        public required int Cantidad { get; set; }
        public decimal SubTotal { get; set; }
    }
}
