import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { RegisterCreds, User } from '../../types/user';
import { pipe, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  currentUser = signal<User | null>(null);
  adminUser = signal<boolean | null>(false);
  private baseUrl = environment.apiUrl;

  register(creds: RegisterCreds) {
    
    if (this.adminUser()) {
      creds.userTypeId = 1;
    } else {
      creds.userTypeId = 2;
    }

    return this.http.post<User>(this.baseUrl + 'account/register', creds).pipe(
      tap((user) => {
        if (user) {
          this.setCurrentUser(user);
        }
      }),
    );
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);

    if (user.userTypeId === 1) {
      this.adminUser.set(true);
    }
    if (user.userTypeId === 2) {
      this.adminUser.set(false);
    }
  }

  login(creds: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', creds).pipe(
      tap((user) => {
        if (user) {
          this.setCurrentUser(user);
        }
      }),
    );
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('administrator');
    this.currentUser.set(null);
    this.adminUser.set(null);
  }
}
