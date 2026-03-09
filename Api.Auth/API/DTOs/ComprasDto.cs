namespace API.DTOs
{
    public class ComprasDto
    {
        public int Id { get; set; }
        public string FechaCompra { get; set; } = null!;
        public string Productos { get; set; } = null!;
        public string Total { get; set; } = null!;
        public bool StatusPago { get; set; }
    }
}
