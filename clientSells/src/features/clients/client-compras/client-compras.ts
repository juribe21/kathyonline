import { Component, inject, signal } from '@angular/core';
import { ToastService } from '../../../core/services/toast-service';
import { VentaService } from '../../../core/services/venta-service';
import { AccountService } from '../../../core/services/account-service';
import { VentaDto } from '../../../types/Venta';

@Component({
  selector: 'app-client-compras',
  imports: [],
  templateUrl: './client-compras.html',
  styleUrl: './client-compras.css',
})
export class ClientCompras {
  protected predicate = 'xxxxxx';
  private toastService = inject(ToastService);
  private ventaService = inject(VentaService);
  protected accountService = inject(AccountService);
  protected ventas = signal<VentaDto[]>([]);


  tabs = [
    { label: 'Recientes (5)', value: 'recientes' },
    { label: 'Canceladas', value: 'canceladas' },
    { label: 'Todas mis compras', value: 'todas' },
  ];

  constructor() {
    this.verCompra();
  }

  verCompra() {
    const cliente = this.accountService.currentUser();
    this.ventaService.getVentasByClientId(cliente?.id || '').subscribe({
      next: (response) => {
        if (response) {
          this.ventas.set(response);
        } else {
          this.toastService.info('No existen ventas para mostrar');
        }
      },
      error: (error) => {
        this.toastService.error(error.error);
      },
    });
  }

  setPredicate(predicate: string) {
    this.toastService.success(predicate);
  }

  deleteCarrito(event: Event, id: string) {
    this.toastService.success('Elemento seleccionado eliminado correctamente');
  }
}
