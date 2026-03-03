import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AccountService } from './account-service';
import { environment } from '../../environments/environment.development';
import { addProduct, Product } from '../../types/Product';
import { NewProductPhoto, Photo } from '../../types/Photo';
import { tap } from 'rxjs';
import { ProductFoto } from '../../features/products/product-foto/product-foto';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private accountService = inject(AccountService);
  private baseUrl = environment.apiUrl;
  newProduct = signal<Product | null>(null);

  getProducts() {
    return this.http.get<Product[]>(this.baseUrl + 'products');
  }

  getProductsV1(cat: string) {
    return this.http.get<Product[]>(this.baseUrl + 'products/GetProducts/' + cat);
  }

  getProduct(id: string) {
    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  getProductPhotos(id: string) {
    return this.http.get<Photo[]>(this.baseUrl + 'products/' + id + '/photos');
  }

  getPreviosPurchasedProducts(id: string) {
    return this.http.get<Photo[]>(this.baseUrl + 'products/' + id + '/photos');
  }

  registrarProduct(newProd: addProduct) {
    return this.http.post<Product>(this.baseUrl + 'ProductsAdmin/add-newproduct', newProd).pipe(
      tap((producto) => {
        if (producto) {
          this.newProduct.set(producto);
        }
      }),
    );
  }

  getFotos(id: string) {
    return this.http.get<NewProductPhoto[]>(this.baseUrl + 'ProductsAdmin/' + id);
  }

  GetListProducts() {
    return this.http.get<Product[]>(this.baseUrl + 'ProductsAdmin');
  }

  removeSelectedProduct(id: string) {
    return this.http.delete(this.baseUrl + 'ProductsAdmin/delete-product/' + id);
  }

  deleteFoto(photo: Photo) {
    return this.http.delete(this.baseUrl + 'ProductsAdmin/delete-photobyid/' + photo.id);
  }

  listSelectedProdcuts() {}

  buySelectedProducts() {}

  // private getHttpOptions() {
  //   return {
  //     headers: new HttpHeaders({
  //       Authorization: 'Bearer ' + this.accountService.currentUser()?.token,
  //     }),
  //   };
  // }
}
