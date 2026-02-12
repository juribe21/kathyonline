import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../core/services/product-service';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Product } from '../../../types/Product';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-product-detailed',
  imports: [AsyncPipe, RouterOutlet],
  templateUrl: './product-detailed.html',
  styleUrl: './product-detailed.css',
})
export class ProductDetailed implements OnInit {
  private productService = inject(ProductService);
  private accountService = inject(AccountService);
  private route = inject(ActivatedRoute);

  protected productName = signal<string | undefined>('Producto');
  protected isCurrentUser = computed(() => {
    return this.accountService.currentUser()?.id === this.route.snapshot.paramMap.get('id');
  });

  protected product$?: Observable<Product>;

  ngOnInit(): void {
    this.product$ = this.loadProduct();
  }

  loadProduct() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    return this.productService.getProduct(id);
  }

  AgregarCarrito() {
    console.log('Producto Agregado');
  }

  Cancel() {
    console.log('Cancelacion de compra');
  }
}
