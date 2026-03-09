using API.DTOs;
using API.Entities;
using API.Extesnions;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class VentasController(IVentasRepository ventasRepository, IPedidosRepository pedidosRepository) : BaseApiController
    {
        /* *************** Pedidos *************** */
        [HttpGet("GetPedidos")]
        public async Task<ActionResult<IReadOnlyList<Pedido>>> GetPedidos()
        {
            var pedidos = await pedidosRepository.GetPedidos();
            if (pedidos.Any())
            {
                return Ok(pedidos);
            }
            return NoContent();
        }


        [HttpGet("GetPedidosById/{id}")]
        public async Task<ActionResult<Pedido>> GetPedidosById(int id)
        {
            var pedido = await pedidosRepository.GetPedidoById(id);
            if (pedido != null)
            {
                return Ok(pedido);
            }
            return BadRequest("Pedido no encontrado");
        }


        [HttpGet("GetPedidosByStatus/{status}")]
        public async Task<ActionResult<IReadOnlyList<Pedido>>> GetPedidosByStatus(string status)
        {
            var pedidosByStatus = await pedidosRepository.GetPedidosByStatus(status);
            if (pedidosByStatus.Any())
            {
                return BadRequest(pedidosByStatus);
            }
            return NoContent();
        }

        [HttpGet("GetPedidoByClient/{clientId}")]
        public async Task<ActionResult<PedidoCarritoDto>> GetPedidoByClient(string clientId)
        {
            var pedidos = await pedidosRepository.GetPedidoByClient(clientId);
            if (pedidos != null)
            {
                return Ok(pedidos);
            }
            return BadRequest("No existen pedidos");
        }

        [HttpPost("agregarPedido")]
        public async Task<ActionResult<Pedido>> AgregarPedido(PedidoDto pedidoDto)
        {
            if (pedidoDto == null) return BadRequest("No se puede insertar un pedido vacio");
            //var isAdmin = await pedidosRepository.ValidateUserAdministrator(User.GetClientId());

            pedidosRepository.AgregarPedido(pedidoDto);

            if (await pedidosRepository.SaveAllAsync())
            {
                return Ok();
            }
            else
            {
                return BadRequest("Problemas para ingresar pedido");
            }
        }


        [HttpPut("updatePedido")]
        public async Task<ActionResult<Pedido>> UpdatePedido(PedidoDto pedidoDto)
        {
            if (pedidoDto == null) return BadRequest("Error con pedido solicitado");
            //var isAdmin = await pedidosRepository.ValidateUserAdministrator(User.GetClientId());

            pedidosRepository.UpdatePedido(pedidoDto);
            if (await pedidosRepository.SaveAllAsync())
            {
                return Ok();
            }
            else
            {
                return BadRequest("Problemas para actualizar el pedido");
            }
        }

        [HttpPut("cancelarPedido/{id}")]
        public async Task<ActionResult<bool>> CancelarPedido(int id)
        {
            var cancelado = pedidosRepository.CancelarPedido(id);
            if (cancelado)
            {
                if (await pedidosRepository.SaveAllAsync())
                {
                    return Ok(true);
                }
                return BadRequest("Pedido no cancelado");
            }
            return BadRequest("Pedido no encontrado");
        }

        [HttpDelete("deletepedido/{id}")]
        public async Task<ActionResult> DeletePedido(int id)
        {
            var pedido = pedidosRepository.GetPedidoById(id);
            if (pedido == null) return BadRequest("Pedido encontrado");
            var isAdmin = await pedidosRepository.ValidateUserAdministrator(User.GetClientId());

            if (isAdmin)
            {
                var deleted = pedidosRepository.DeletePedido(id);
                if (deleted)
                {
                    if (await pedidosRepository.SaveAllAsync())
                    {
                        return Ok();
                    }
                }
                return BadRequest("Problemas para eliminar pedido");
            }
            return BadRequest("Usuario no autorizado para esta operacion");

        }


        /* *************** Ventas *************** */
        [HttpPost("agregarventa/{id}")]
        public async Task<ActionResult> AgregarVenta(string id)
        {
            await ventasRepository.AgregarVenta(id);
            await pedidosRepository.UpdatePedidoStatus(id);

            if (await ventasRepository.SaveAllAsync())
            {
                

                return Ok();
            }
            else
            {
                return BadRequest("No fue posible registrar la compra");
            }
        }

        [HttpGet("getventas")]
        public async Task<ActionResult<List<VentaDto>>> GetVentas()
        {
            var ventas = await ventasRepository.GetVentas();
            if (ventas.Any())
            {
                return Ok(ventas);
            }
            else
            {
                return NotFound(new { ventas = 0 });
            }
        }

        [HttpGet("getventasbyId/{id}")]
        public async Task<ActionResult<List<VentaDto>>> GetVentasbyId(int id)
        {
            var venta = await ventasRepository.GetVentaById(id);
            if (venta != null)
            {
                return Ok(venta);
            }
            else
            {
                return NotFound(new { venta = 0 });
            }            
        }

        [HttpGet("GetVentasByClientId/{id}")]
        public async Task<ActionResult<List<VentaDto>>> GetVentasByClientId(string id)
        {
            var venta = ventasRepository.GetVentasByClientId(id);
            if (venta != null)
            {
                return Ok(venta);
            }
            else
            {
                return NotFound(new { venta = 0 });
            }
        }
    }
}
