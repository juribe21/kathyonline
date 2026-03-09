import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { addPedido, Pedido, pedidoCarrito } from '../../types/Pedido';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private http = inject(HttpClient);

  private baseUrl = environment.apiUrl;
  newPedido = signal<Pedido | null>(null);

  getPedidos() {
    return this.http.get<Pedido[]>(this.baseUrl + 'ventas/GetPedidos');
  }

  getPedidoById(id: number) {
    return this.http.get<Pedido>(this.baseUrl + 'ventas/GetPedidosById/' + id);
  }

  getPedidosByStatus(status: string) {
    return this.http.get<Pedido[]>(this.baseUrl + 'ventas/GetPedidos/' + status);
  }

  getPedidosByClientId(id: string) {
    return this.http.get<pedidoCarrito[]>(this.baseUrl + 'ventas/GetPedidoByClient/' + id);
  }

  agregarPedido(addpedido: addPedido) {
    return this.http.post<Pedido>(this.baseUrl + 'ventas/agregarPedido', addpedido).pipe(
      tap((pedido) => {
        if (pedido) {
          this.newPedido.set(pedido);
        }
      }),
    );
  }

  updatePedido(addpedido: pedidoCarrito) {
    return this.http.put(this.baseUrl + 'ventas/updatePedido', addpedido);
  }

  cancelarPedido(id: number) {
    return this.http.put(this.baseUrl + 'ventas/cancelarPedido/' + id, {});
  }

  deletePedido(id: number) {
    this.http.delete(this.baseUrl + 'ventas/deletepedido/' + id);
  }
}
