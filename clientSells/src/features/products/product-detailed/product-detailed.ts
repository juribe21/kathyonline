import { Component, computed, inject, OnInit, output, signal } from '@angular/core';
import { ProductService } from '../../../core/services/product-service';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

import { filter } from 'rxjs';
import { Product } from '../../../types/Product';
import { AccountService } from '../../../core/services/account-service';
import { ToastService } from '../../../core/services/toast-service';
import { addPedido, Pedido } from '../../../types/Pedido';
import { FormsModule } from '@angular/forms';
import { PedidoService } from '../../../core/services/pedido-service';
import { DatePipe } from '@angular/common';
import { CarritoCompras } from '../../pedidos/carrito-compras/carrito-compras';
import { VentaService } from '../../../core/services/venta-service';

@Component({
  selector: 'app-product-detailed',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, FormsModule],
  templateUrl: './product-detailed.html',
  styleUrl: './product-detailed.css',
})
export class ProductDetailed implements OnInit {
  private productService = inject(ProductService);
  protected accountService = inject(AccountService);
  private toastService = inject(ToastService);
  private pedidoService = inject(PedidoService);
  private ventaService = inject(VentaService);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  protected productName = signal<string | undefined>('Producto Name');
  protected isCurrentUser = computed(() => {
    return this.accountService.currentUser()?.id === this.route.snapshot.paramMap.get('id');
  });

  protected product = signal<Product | undefined>(undefined);
  protected pedido = signal<Pedido | null>(null);
  protected newPedido = signal<addPedido | null>(null);
  contador: number = 0;
  

  protected addNewpedido: addPedido = {
    id: 0,
    clientId: this.newPedido()?.clientId || '',
    puntoEntregaId: this.newPedido()?.puntoEntregaId || 0,
    fechaPedido: this.newPedido()?.fechaPedido || '',
    productoId: this.newPedido()?.productoId || '',
    categoriaId: this.newPedido()?.categoriaId || '',
    cantidad: this.newPedido()?.cantidad || 0,
    subTotal: this.newPedido()?.subTotal || 0,
    transactionId: this.newPedido()?.transactionId || '',
    status: this.newPedido()?.status || 0,
  };


  ngOnInit(): void {
    /* Get information from resolver */
    this.route.data.subscribe({
      next: (data) => this.product.set(data['product']),
    });

    this.productName.set(this.route.firstChild?.snapshot.title);
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe({
      next: () => {
        this.productName.set(this.route.firstChild?.snapshot.title);
      },
    });
  }

  // loadProduct() {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   if (!id) return;
  //   return this.productService.getProduct(id);
  // }

  AgregarCarrito() {
    const product = this.product();
    const cliente = this.accountService.currentUser();
    const currentday: Date = new Date();

    if (this.contador > 0) {
      this.addNewpedido = {
        id: 0,
        clientId: cliente?.id || '',
        puntoEntregaId: 1,
        fechaPedido: '2026-02-04',
        productoId: product?.id || '',
        categoriaId: product?.categoriaId || '',
        cantidad: this.contador,
        subTotal: product?.precio || 0,
        transactionId: '',
        status: 1,
      };
      console.log('Nuevo Pedido: → ', this.addNewpedido);
      this.pedidoService.agregarPedido(this.addNewpedido).subscribe({
        next: (response) => {
          this.pedido.set(response);
          this.toastService.success(
            this.contador + ' - ' + product?.productName + '" ha sido agregado',
          );
        },
      });
    } else {
      this.toastService.error(
        'Ingrese cantidad a solicitar, No puede ser cero [' + this.contador + ']',
      );
    }
    //  → Generar transationId, obtener cantidad, suma subTotal para la venta, S
  }

  Cancel() {
    console.log('Cancelacion de compra');
  }



  eliminarProducto(event: Event) {
    event.stopPropagation();

    const product = this.product();
    this.productService.removeSelectedProduct(product?.id as string).subscribe({
      next: (response) => {
        this.toastService.success('Producto eliminado correctamente');
        this.router.navigateByUrl('/listaproductos');
      },
      error: (error) => {
        this.toastService.error(error);
        this.toastService.success(product?.id + ' No se elimino el producto seleccionado');
      },
    });
  }
}
