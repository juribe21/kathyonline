import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../types/Product';
import { AdminService } from '../../../core/services/admin-service';
import { Observable } from 'rxjs';
import { ProductService } from '../../../core/services/product-service';
import { Photo } from '../../../types/Photo';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-product-foto',
  imports: [AsyncPipe],
  templateUrl: './product-foto.html',
  styleUrl: './product-foto.css',
})
export class ProductFoto implements OnInit {
  private route = inject(ActivatedRoute);
  protected product = signal<Product | undefined>(undefined);
  private adminService = inject(AdminService);
  private productService = inject(ProductService);

  protected photos$?: Observable<Photo[]>;

  constructor() {
    const clientId = this.route.parent?.snapshot.paramMap.get('id');
    if (clientId) {
      this.photos$ = this.productService.getPreviosPurchasedProducts(clientId);
    }
  }

  ngOnInit(): void {
    this.route.parent?.data.subscribe((data) => {
      this.product.set(data['product']);
    });
  }
}
