import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast-service';

@Component({
  selector: 'app-client-compras',
  imports: [],
  templateUrl: './client-compras.html',
  styleUrl: './client-compras.css',
})
export class ClientCompras {
  protected predicate = 'xxxxxx';
  private toastService = inject(ToastService);

  tabs = [
    { label: 'Recientes (5)', value: 'recientes' },
    { label: 'Canceladas', value: 'canceladas' },
    { label: 'Todas mis compras', value: 'todas' },
  ];

  setPredicate(predicate: string) {
    this.toastService.success(predicate);
  }

  deleteCarrito(event: Event, id: string) {
    this.toastService.success('Elemento seleccionado eliminado correctamente');
  }
}
