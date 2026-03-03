import { Component } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  imports: [],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css',
})
export class Pedidos {
  protected predicate = 'pedidos';
  tabs = [
    { label: 'Pedidos', value: 'pedidos' },
    { label: 'Pagados', value: 'pagados' },
    { label: 'Mis compras', value: 'miscompras' },
  ];

  setPredicate(predicate: string) {}
}
