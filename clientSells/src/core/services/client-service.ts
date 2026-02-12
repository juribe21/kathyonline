import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Product } from '../../types/Product';
import { AccountService } from './account-service';

/* ************************ Service for Clients operations *************************** */

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private http = inject(HttpClient);
  private accountService = inject(AccountService);
  private baseUrl = environment.apiUrl;

  getProducts() {
    // return this.http.get<Product[]>(this.baseUrl + 'products');
  }

  getFilteredProducts() {
    // return this.http.get<Product[]>(this.baseUrl + 'products');
  }

  getProduct(id: string) {
    // return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  getLikedProduct(id: string) {
    // return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  setLikedProduct(id: string) {
    // return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  addProductToCar(id: string) {
    // return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  removeProductFromCar(id: string) {
    // return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  buyProduct(id: string) {
    // return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  getlistaProductosComprados(id: string) {
    // return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  // private getHttpOptions() {
  //   return {
  //     headers: new HttpHeaders({
  //       Authorization: 'Bearer ' + this.accountService.currentUser()?.token,
  //     }),
  //   };
  // }
}
