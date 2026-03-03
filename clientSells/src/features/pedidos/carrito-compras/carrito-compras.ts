import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast-service';
import { AccountService } from '../../../core/services/account-service';

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

  tabs = [
    { label: 'Por Entregar', value: 'porEntregar' },
    { label: 'Historial', value: 'historial' },
    { label: 'Entregados', value: 'entregados' },
  ];

  setPredicate(predicate: string) {
    this.toastService.success(predicate);
  }

  deleteCarrito(event: Event, id: string) {
    this.toastService.success('Compra cancelada');
    // recargar lista sin la compra seleccionada
    // Implementar sistema de transacciones por cada carrito
  }

  comprar() {
    this.toastService.success('Pedido enviado');
    // Poner estatus como enviado
    // cambiar a listo para entrega
    // -- enviar msj
  }
}
