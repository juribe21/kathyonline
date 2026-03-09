import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { VentaDto } from '../../types/Venta';

@Injectable({
  providedIn: 'root',
})
export class VentaService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  agregarPedido(id: string) {
    return this.http.post(this.baseUrl + 'ventas/agregarventa/' + id, {});
  }

  getVentasByClientId(id: string) {
    return this.http.get<VentaDto[]>(this.baseUrl + 'ventas/GetVentasByClientId/' + id);
  }
}
