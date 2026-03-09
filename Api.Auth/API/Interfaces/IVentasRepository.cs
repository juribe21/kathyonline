using API.DTOs;
using API.Entities;


namespace API.Interfaces
{
    public interface IVentasRepository 
    {
        Task<List<VentaDto>> GetVentas();
        Task<IReadOnlyList<VentaDto>> GetVentasByStatus();
        Task<VentaDto> GetVentaById(int id);
        List<VentaDto> GetVentasByClientId(string clientId);
        Task AgregarVenta(string id);
        void UpdateVenta(VentaDto ventaDto);
        void DeleteVenta(int id);
        void CancelarVenta(int id);
        Task<bool> SaveAllAsync();
    }
}
