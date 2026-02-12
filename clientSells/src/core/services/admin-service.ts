import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { AccountService } from './account-service';
import { Client } from '../../types/Client';

/* ************************ Service for Admin operations *************************** */

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private http = inject(HttpClient);
  private accountService = inject(AccountService);
  private baseUrl = environment.apiUrl;

  /* *********************** CLIENTS ********************************** */
  getClients() {
    return this.http.get<Client[]>(this.baseUrl + 'clients');
  }

  getClient(id: string) {
    return this.http.get<Client>(this.baseUrl + 'clients/' + id);
  }

  // private getHttpOptions() {
  //   return {
  //     headers: new HttpHeaders({
  //       Authorization: 'Bearer ' + this.accountService.currentUser()?.token,
  //     }),
  //   };
  // }
}
