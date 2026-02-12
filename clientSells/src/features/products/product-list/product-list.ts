import { Component, inject } from '@angular/core';
import { ProductService } from '../../../core/services/product-service';
import { Observable } from 'rxjs';
import { Product } from '../../../types/Product';
import { AsyncPipe } from '@angular/common';
import { ProductCard } from '../product-card/product-card';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [AsyncPipe, ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  protected products$: Observable<Product[]>;

  constructor() {
    const cat = this.route.snapshot.paramMap.get('cat');
    if (!cat) {
      this.products$ = this.productService.getProductsV1('');
    } else {
      this.products$ = this.productService.getProductsV1(cat);
    }

  }

  loadFilteredProducts() {

  }
}
