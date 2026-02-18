import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { AccountService } from './account-service';
import { Client, EditableClient } from '../../types/Client';
import { tap } from 'rxjs';

/* ************************ Service for Admin operations *************************** */

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private http = inject(HttpClient);
  private accountService = inject(AccountService);
  private baseUrl = environment.apiUrl;
  editMode = signal(false);
  client = signal<Client | null>(null);

  /* *********************** CLIENTS ********************************** */
  getClients() {
    return this.http.get<Client[]>(this.baseUrl + 'clients');
  }

  getClient(id: string) {
    return this.http.get<Client>(this.baseUrl + 'clients/' + id)
    .pipe(
      tap(client => {
        this.client.set(client);
      })
    )
  }

  updateMember(client: EditableClient) {
    return this.http.put(this.baseUrl + 'clients', client);
  }

  // private getHttpOptions() {
  //   return {
  //     headers: new HttpHeaders({
  //       Authorization: 'Bearer ' + this.accountService.currentUser()?.token,
  //     }),
  //   };
  // }
}
