using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IPedidosRepository
    {
        Task<IReadOnlyList<Pedido>> GetPedidos();
        Task<IReadOnlyList<Pedido>> GetPedidosByStatus(string status);
        Task<Pedido?> GetPedidoById(int id);
        Task<List<PedidoCarritoDto>> GetPedidoByClient(string clientId);
        Pedido AgregarPedido(PedidoDto pedidoDto);
        Pedido UpdatePedido(PedidoDto pedidoDto);
        bool DeletePedido(int id);
        bool CancelarPedido(int id);
        Task<bool> UpdatePedidoStatus(string clientid);
        Task<bool> SaveAllAsync();
        Task<bool> ValidateUserAdministrator(string userId);
    }
}
