using API.DTOs;
using API.Entities;
using API.Enums;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class PedidodRepository(AppDbContext context) : IPedidosRepository
    {
        public async Task<IReadOnlyList<Pedido>> GetPedidos()
        {
            return await context.Pedidos.ToListAsync();
        }
     
        public async Task<Pedido?> GetPedidoById(int id)
        {
            return await context.Pedidos.FindAsync(id); 
        }

        public async Task<List<PedidoCarritoDto>> GetPedidoByClient(string clientId)
        {
            var pedidoCarritoDto = new PedidoCarritoDto();
            var clientePedidos = await context.Pedidos.Where(x =>  x.ClientId == clientId).CountAsync();
            if(clientePedidos <= 0)
                return null;

            IQueryable<PedidoCarritoDto> pedidoCarrito =
                (from pedido in context.Pedidos
                 join cliente in context.Clients on pedido.ClientId equals cliente.Id
                 join prod in context.Products on pedido.ProductoId equals prod.Id
                 where pedido.ClientId == clientId && pedido.TransactionId == null && pedido.Status == (int)EStatusPedidos.Pedido
                 select new PedidoCarritoDto
                 {
                     Id = pedido.Id,
                     status = ConvertStatusToString(pedido.Status), 
                     NombreCliente = cliente.Name + " " +cliente.LastName,
                     NombreProducto = prod.ProductName,
                     Cantidad = pedido.Cantidad,
                     SubTotal = pedido.SubTotal,
                     FechaPedido = pedido.FechaPedido.ToString(),
                     FechaCompra = pedido.Status == 2? DateTime.Now.ToShortDateString() : ""
                 });

            return pedidoCarrito.ToList();
        }

        public async Task<IReadOnlyList<Pedido>> GetPedidosByStatus(string status)
        {
            int pedidoStatus = ConvertStatusToInt(status);
            return await context.Pedidos.Where(x => x.Status == pedidoStatus).ToListAsync();
        }


        public Pedido AgregarPedido(PedidoDto pedidoDto)
        {
            pedidoDto.FechaPedido = DateOnly.Parse(DateTime.Now.ToShortDateString());

            // ObtnerStatus            

            var pedido = new Pedido
            { 
                ClientId = pedidoDto.ClientId,
                PuntoEntregaId = pedidoDto.PuntoEntregaId,
                FechaPedido = pedidoDto.FechaPedido,
                ProductoId = pedidoDto.ProductoId,
                CategoriaId = pedidoDto.CategoriaId,
                Cantidad = pedidoDto.Cantidad,
                SubTotal = pedidoDto.SubTotal * pedidoDto.Cantidad,
                Status = pedidoDto.Status,
                TransactionId = null //Guid.NewGuid().ToString(),
            };

            context.Pedidos.Add(pedido);
            return pedido;
        }

        public Pedido UpdatePedido(PedidoDto pedidoDto)
        {
            var pedido =  context.Pedidos.Where(x => x.Id == pedidoDto.Id && x.TransactionId == pedidoDto.TransactionId).FirstOrDefault();
            if(pedido == null)
            {
                return pedido;
            }

            pedido = new Pedido
            {
                ClientId = pedidoDto.ClientId,
                PuntoEntregaId = pedidoDto.PuntoEntregaId,
                FechaPedido = pedidoDto.FechaPedido,
                ProductoId = pedidoDto.ProductoId,
                CategoriaId = pedidoDto.CategoriaId,
                Cantidad = pedidoDto.Cantidad,
                SubTotal = pedidoDto.SubTotal * pedidoDto.Cantidad,
                TransactionId = null,
                Status = pedidoDto.Status,
            };

            context.Entry(pedido).State = EntityState.Modified;
            return pedido;
        }

        public bool CancelarPedido(int id)
        {
            var pedido = context.Pedidos.Where(x => x.Id == id).FirstOrDefault();
            if (pedido == null)
            {
                return false;
            }
            pedido.Status = (int)EStatusPedidos.Cancelado;
            context.Entry(pedido).State &= EntityState.Modified;
            return true;
        }

        public async Task<bool> UpdatePedidoStatus(string clientid)
        {
            var pedido = await context.Pedidos
                .Where(x => x.ClientId == clientid && x.Status == (int)EStatusPedidos.Pedido)
                .ToListAsync();

            if (pedido.Count() <= 0)
            {
                return false;
            }

            foreach (var item in pedido)
            {
                item.Status = (int)EStatusPedidos.Venta;
                context.Entry(item).State &= EntityState.Modified;
            }
            
            return true;
        }

        // solo administrador
        public bool DeletePedido(int id)
        {
            // solo administrador
            return true;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public async Task<bool> ValidateUserAdministrator(string userId)
        {
            var user = await context.AppUsers.Where(x => x.Id == userId).SingleAsync();
            if (user == null) return false;

            if (user.UserTypeId == (int)EUserTypes.Admin) return true; // Admin
            else
            {
                return false;
            }
        }

        private int ConvertStatusToInt(string status)
        {
            switch (status)
            {
                case "pedido":
                    return (int)EStatusPedidos.Pedido;
                case "creado":
                    return (int)EStatusPedidos.Creado;
                case "enProceso":
                    return (int)EStatusPedidos.Venta;
                case "cancelado":
                    return (int)EStatusPedidos.Cancelado;
                case "enVenta":
                    return (int)EStatusPedidos.Vendido;
                default: return 0;
            }
        }

        private static string ConvertStatusToString(int status)
        {
            switch (status)
            {
                case (int)EStatusPedidos.Pedido:
                    return "Pedido";
                case (int)EStatusPedidos.Creado:
                    return "Creado";
                case (int)EStatusPedidos.Venta:
                    return "En Proceso";
                case (int)EStatusPedidos.Cancelado:
                    return "Cancelado";
                case (int)EStatusPedidos.Vendido:
                    return "Vendido";
                default: return "Pedido";
            }
        }

       
    }
}
