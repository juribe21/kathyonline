import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../core/services/product-service';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { filter, Observable } from 'rxjs';
import { Product } from '../../../types/Product';
import { AccountService } from '../../../core/services/account-service';
import { ToastService } from '../../../core/services/toast-service';

@Component({
  selector: 'app-product-detailed',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './product-detailed.html',
  styleUrl: './product-detailed.css',
})
export class ProductDetailed implements OnInit {
  private productService = inject(ProductService);
  protected accountService = inject(AccountService);
  private toastService = inject(ToastService);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  protected productName = signal<string | undefined>('Producto Name');
  protected isCurrentUser = computed(() => {
    return this.accountService.currentUser()?.id === this.route.snapshot.paramMap.get('id');
  });

  protected product = signal<Product | undefined>(undefined);

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
    this.toastService.success('Producto "' + product?.productName + '" ha sido agregado');
    // Recarar la lista con producto agregado
  }

  Cancel() {
    console.log('Cancelacion de compra');
  }

  verCompra() {}

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
