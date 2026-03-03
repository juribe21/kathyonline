import { Component, inject, signal, Signal } from '@angular/core';
import { ProductService } from '../../../core/services/product-service';
import { Product } from '../../../types/Product';
import { AsyncPipe } from '@angular/common';
import { ProductCard } from '../product-card/product-card';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../core/services/toast-service';

@Component({
  selector: 'app-product-list',
  imports: [AsyncPipe, ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  //protected products$: Observable<Product[]>;
  protected products = signal<Product[]>([]);
  private toastService = inject(ToastService);

  constructor() {
    // const cat = this.route.snapshot.paramMap.get('cat');
    // if (!cat) {
    //   this.products$ = this.productService.getProductsV1('a');
    // } else {
    //   this.products$ = this.productService.getProductsV1(cat);
    // }
    this.loadProductList();
  }

  loadProductList() {
    const cat = this.route.snapshot.paramMap.get('cat');
    if (!cat) {
      this.productService.getProductsV1('a').subscribe({
        next: (response) => {
          this.products.set(response);
        },
      });
    } else {
      this.productService.getProductsV1(cat as string).subscribe({
        next: (response) => {
          this.products.set(response);
        },
      });
    }
  }

  loadFilteredProducts(value: boolean) {
    if (value) {
      this.loadProductList();
    } else {
      this.toastService.error('No se elimino el producto seleccionado');
    }
  }
}
