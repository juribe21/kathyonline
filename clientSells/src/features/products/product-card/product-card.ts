import { Component, inject, input, output } from '@angular/core';
import { Product } from '../../../types/Product';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../../core/services/admin-service';
import { AccountService } from '../../../core/services/account-service';
import { ProductService } from '../../../core/services/product-service';
import { ToastService } from '../../../core/services/toast-service';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  product = input.required<Product>();
  protected accountService = inject(AccountService);
  protected productService = inject(ProductService);
  protected toastService = inject(ToastService);
  deleteOk = output<boolean>();

  deleteProduct(event: Event, id: string) {
    event.stopPropagation();
    this.productService.removeSelectedProduct(id).subscribe({
      next: (response) => {
        this.toastService.success('Producto eliminado correctamente');
        //this.GetListProducts();
        this.deleteOk.emit(true);
      },
      error: (error) => {
        this.toastService.error(error);
        this.deleteOk.emit(false);
      },
    });
  }
}
