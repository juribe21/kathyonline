import { Component, inject, signal } from '@angular/core';
import { ImageUpload } from '../../../shared/image-upload/image-upload';
import { FotoService } from '../../../core/services/foto-service';
import { AdminService } from '../../../core/services/admin-service';
import { NewProductPhoto, Photo } from '../../../types/Photo';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ProductService } from '../../../core/services/product-service';
import { ProductFoto } from '../../products/product-foto/product-foto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fotos-nuevos-productos',
  imports: [ImageUpload],
  templateUrl: './fotos-nuevos-productos.html',
  styleUrl: './fotos-nuevos-productos.css',
})
export class FotosNuevosProductos {
  private fotoService = inject(FotoService);
  private productService = inject(ProductService);
  protected loading = signal(false);
  protected adminService = inject(AdminService);
  private route = inject(Router);
  // protected photo = signal<Photo | undefined>(undefined);

  protected fotos = signal<NewProductPhoto[]>([]);

  constructor() {
    this.recargarForma();
  }

  onUploadImafe(file: File) {
    this.loading.set(true);
    const id = localStorage.getItem('newProductId') as string;
    this.fotoService.uploadFoto(file, id).subscribe({
      next: (returnFoto) => {
        this.adminService.editMode.set(false);
        this.loading.set(false);
        // this.photo.set(returnFoto);
        this.recargarForma();
      },
      error: (error) => {
        console.log('Error uploading imagen!!', error);
        this.loading.set(false);
      },
    });
  }

  recargarForma() {
    const id = localStorage.getItem('newProductId') as string;
    if (id) {
      this.productService.getFotos(id).subscribe({
        next: (response) => {
          this.fotos.set(response);
        },
      });
    }
  }

  terminar() {
    localStorage.removeItem('newProductId');
    this.fotos.set([]);
    this.route.navigateByUrl('/adminproducts/addproduct');
    //this.recargarForma();
  }
}
