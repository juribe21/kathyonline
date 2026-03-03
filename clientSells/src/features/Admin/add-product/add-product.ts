import { Component, HostListener, inject, signal, ViewChild } from '@angular/core';
import { AccountService } from '../../../core/services/account-service';
import { FotoService } from '../../../core/services/foto-service';
import { AdminService } from '../../../core/services/admin-service';
import { Photo } from '../../../types/Photo';
import { ImageUpload } from '../../../shared/image-upload/image-upload';
import { FormsModule, NgForm } from '@angular/forms';
import { addProduct } from '../../../types/Product';
import { ProductService } from '../../../core/services/product-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct {
  @ViewChild('addForm') addForm?: NgForm;
  protected accountService = inject(AccountService);
  private productService = inject(ProductService);
  private router = inject(Router);

  newProduct = signal<addProduct | null>(null);

  @HostListener('window:beforeunload', ['$event']) notify($event: BeforeUnloadEvent) {
    if (this.addForm?.dirty) {
      $event.preventDefault();
    }
  }

  // Ver la seccion 12 lesson 141-142
  protected addNewProduct: addProduct = {
    id: '',
    productName: this.newProduct()?.productName || '',
    precio: this.newProduct()?.precio || 0,
    cantidad: this.newProduct()?.cantidad || 0,
    description: this.newProduct()?.productName || '',
    productImageUrl: this.newProduct()?.productName || '',
    categoriaId: this.newProduct()?.productName || '',
  };

  registrarProduct() {
    if (this.accountService.adminUser()) {
      const nuevoProducto = { ...this.productService.newProduct, ...this.addNewProduct };
      this.productService.registrarProduct(nuevoProducto).subscribe({
        next: (response) => {
          this.newProduct.set(response);
          if (localStorage.getItem('newProductId') !== null) {
            localStorage.removeItem('newProductId');
            localStorage.setItem('newProductId', this.newProduct()?.id as string);
          } else {
            localStorage.setItem('newProductId', this.newProduct()?.id as string);
          }
        },
      });
      this.router.navigateByUrl('/adminproducts/foto');
    }
  }
}
