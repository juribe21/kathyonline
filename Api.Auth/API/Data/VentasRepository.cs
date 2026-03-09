using API.DTOs;
using API.Entities;
using API.Enums;
using API.Interfaces;
using Humanizer;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class VentasRepository(AppDbContext context) : IVentasRepository
    {
        public async Task<List<VentaDto>> GetVentas()
        {
            var ventas = await context.Ventas.ToListAsync();
            List<VentaDto> lista = new List<VentaDto>();
            foreach (var venta in ventas)
            {
                var ventadto = new VentaDto
                {
                    NombreClient = venta.ClientId,
                    PuntoEntrega = "Punto de Entrega",
                    FechaEntrega = DateOnly.Parse(DateTime.Now.ToLongDateString()),
                    Total = 1500,
                };

                lista.Add(ventadto);
            }
            return lista;
        }

        public async Task<VentaDto> GetVentaById(int id)
        {
            var venta  = await context.Ventas
                .Include(x => x.DetalleVentas)
                .SingleAsync(vent => vent.Id == id);
            var ventaDto = new VentaDto
            {
                NombreClient = venta.ClientId!,
                PuntoEntrega = "PuntoEntrega",
                FechaEntrega = venta.FechaEntrega,
                Total = venta.Total,
            };

            return ventaDto;
        }

        public async Task AgregarVenta(string clientId)
        {
            List<DetalleVenta> ventas = new List<DetalleVenta>();

            List<Pedido> pedido =  context.Pedidos
                .Where(x => x.ClientId == clientId && x.Status == (int)EStatusPedidos.Pedido)
                .ToList();

            var venta = new Venta
            {
                ClientId = clientId,
                PuntoEntregaId = pedido.FirstOrDefault().PuntoEntregaId,
                FechaEntrega = DateOnly.Parse(DateTime.Now.ToShortDateString()),
                Total = pedido.Sum(x => x.SubTotal),
                TrnasactionId = Guid.NewGuid().ToString(),

            };
            context.Ventas.Add(venta);

            await SaveAllAsync();

            foreach (var item in pedido)
            {
                var dv = new DetalleVenta
                { 
                    VentaId = venta.Id,
                    ProductoId = item.ProductoId,
                    CategoriaId = item.CategoriaId,
                    Cantidad = item.Cantidad,
                    SubTotal = item.SubTotal,
                };
                ventas.Add(dv);
            }

            context.DetalleVentas.AddRange(ventas);
        }

        public void CancelarVenta(int id)
        {
            throw new NotImplementedException();
        }

        public void DeleteVenta(int id)
        {
            throw new NotImplementedException();
        }


        public Task<IReadOnlyList<VentaDto>> GetVentasByStatus()
        {
            throw new NotImplementedException();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public void UpdateVenta(VentaDto ventaDto)
        {
            throw new NotImplementedException();
        }

        public List<VentaDto> GetVentasByClientId(string clientId)
        {
            List<VentaDto> List = new List<VentaDto>();
            IQueryable<VentaDto> venta =
                (from v in context.Ventas                 
                 join cli in context.Clients on v.ClientId equals cli.Id                 
                 join pe in context.PuntosEntrega on v.PuntoEntregaId equals pe.Id
                 where v.ClientId == clientId
                 select new VentaDto
                 {
                     Id = v.Id,
                     NombreClient = cli.Name + " " + cli.LastName,
                     PuntoEntrega = pe.LugarEntrega,
                     Productos = "",
                     FechaEntrega = v.FechaEntrega,
                     Total = v.Total
                 });


            foreach (var v in venta)
            {   
                v.Productos = GetNombreProductos(v.Id); ;
                List.Add(v);
            }            

            return List;
        }

        private string GetNombreProductos(int id)
        {
            string listaProductos = string.Empty;

            var prods = (from dv in context.DetalleVentas
                        join prod in context.Products on dv.ProductoId equals prod.Id
                        where dv.VentaId == id
                        select new
                        {
                            nombreProducto = prod.ProductName
                        }).ToList();
            
            int cont = prods.Count;

            foreach (var prod in prods)
            {
                if (cont == 1)
                {
                    listaProductos += prod.nombreProducto;
                }
                else
                {
                    listaProductos += prod.nombreProducto + ", ";
                }               

                cont--;
            }

            return listaProductos;
        }
    }
}
