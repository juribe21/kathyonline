import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AccountService } from './account-service';
import { environment } from '../../environments/environment.development';
import { Product } from '../../types/Product';
import { Photo } from '../../types/Photo';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private accountService = inject(AccountService);
  private baseUrl = environment.apiUrl;
  

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

  addSelectedProduct() {}

  removeSelectedProduct() {}

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
