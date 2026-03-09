import { Component, inject, signal } from '@angular/core';
import { ToastService } from '../../../core/services/toast-service';
import { AccountService } from '../../../core/services/account-service';
import { PedidoService } from '../../../core/services/pedido-service';
import { AdminService } from '../../../core/services/admin-service';
import { addPedido, pedidoCarrito } from '../../../types/Pedido';
import { ActivatedRoute } from '@angular/router';
import { VentaService } from '../../../core/services/venta-service';

@Component({
  selector: 'app-carrito-compras',
  imports: [],
  templateUrl: './carrito-compras.html',
  styleUrl: './carrito-compras.css',
})
export class CarritoCompras {
  protected predicate = 'xxxxxx';
  private toastService = inject(ToastService);
  protected accountService = inject(AccountService);
  private pedidoService = inject(PedidoService);
  private ventaService = inject(VentaService);
  private route = inject(ActivatedRoute);

  protected pedidoCarrito = signal<pedidoCarrito[]>([]);
  currentUser = '';

  tabs = [
    { label: 'Por Entregar', value: 'porEntregar' },
    { label: 'Historial', value: 'historial' },
    { label: 'Entregados', value: 'entregados' },
  ];

  constructor() {
    this.cargarPedidos();
  }

  setPredicate(predicate: string) {
    this.toastService.success(predicate);
  }

  deleteCarrito(event: Event, id: number) {
    this.toastService.success('Compra cancelada');
    // recargar lista sin la compra seleccionada
    // Implementar sistema de transacciones por cada carrito
  }

  Remover(event: Event, pedido: pedidoCarrito) {
    this.pedidoService.cancelarPedido(pedido.id).subscribe({
      next: (response) => {
        if (response) {
          this.cargarPedidos();
          this.toastService.info('Producto removido');
        } else {
          this.toastService.error('Problemas para cancelar producto');
        }
      },
    });
  }

  cargarPedidos() {
    this.currentUser = this.accountService.currentUser()?.id || '';
    this.pedidoService.getPedidosByClientId(this.currentUser).subscribe({
      next: (response) => {
        if (response) {
          this.pedidoCarrito.set(response);
        } else {
          this.toastService.info('No hay pedidos que mostrar');
        }
      },
      error: (error) => {
        this.toastService.error(error.error);
      },
    });
  }

  comprar() {
    if (!this.currentUser) {
      this.currentUser = this.accountService.currentUser()?.id || '';
    }

    this.ventaService.agregarPedido(this.currentUser).subscribe({
      next: () => {
        this.toastService.success('Pedido enviado');
        this.cargarPedidos();
      },
      error: (error) => {
        this.toastService.error(error.error);
      },
    });

    // Poner estatus como enviado
    // cambiar a listo para entrega
    // -- enviar msj
  }
}
