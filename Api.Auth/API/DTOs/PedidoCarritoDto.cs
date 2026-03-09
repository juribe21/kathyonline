namespace API.DTOs
{
    public class PedidoCarritoDto
    {
        public int Id { get; set; }
        public string? status { get; set; }
        public string? NombreCliente { get; set; }
        public string? NombreProducto { get; set; }
        public int Cantidad { get; set; }
        public decimal SubTotal { get; set; }
        public string? FechaPedido { get; set; }
        public string? FechaCompra { get; set; }
    }
}
