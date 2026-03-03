import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../core/services/product-service';
import { Message } from '../../../types/Message';
import { Product } from '../../../types/Product';
import { ToastService } from '../../../core/services/toast-service';

@Component({
  selector: 'app-eliminar-producto',
  imports: [],
  templateUrl: './eliminar-producto.html',
  styleUrl: './eliminar-producto.css',
})
export class EliminarProducto implements OnInit {
  protected predicate = 'productos';
  private productService = inject(ProductService);
  private toastService = inject(ToastService);

  //protected paginatedMessages = signal<PaginatedResult<Message> | null>(null);
  protected paginatedProduct = signal<Product[] | null>([]);
  protected pageNumber = 1;
  protected pageSize = 10;

  tabs = [
    { label: 'Productos', value: 'productos' },
    { label: 'En existencia', value: 'existencia' },
    { label: 'Eliminados', value: 'eliminados' },
  ];

  ngOnInit(): void {
    this.GetListProducts();
  }

  setPredicate(predicate: string) {
    this.GetListProducts();
  }

  GetListProducts() {
    this.productService.GetListProducts().subscribe({
      next: (response) => {
        this.paginatedProduct.set(response);
      },
    });
  }

  deleteProduct(event: Event, id: string) {
    event.stopPropagation();
    this.productService.removeSelectedProduct(id).subscribe({
      next: (response) => {
        this.toastService.success('Producto eliminado correctamente');
        this.GetListProducts();
      },
      error: (error) => {
        this.toastService.error(error);
      },
    });
  }
}
