import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Nav } from '../layout/nav/nav';
import { User } from '../types/user';
import { Router, RouterOutlet } from '@angular/router';
import { AccountService } from '../core/services/account-service';

@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private http = inject(HttpClient);
  protected router = inject(Router);
  protected readonly title = signal('Kathy Accesosrios');
  protected users = signal<User[]>([]);

  /* All code commented out will be called from differente location */

  private accountService = inject(AccountService);

  // ngOnInit(): void {
  //   this.getUsers();
  //   this.setCurrentUser();
  // }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

  // async getUsers() {
  //   try {
  //     return lastValueFrom(this.http.get<User[]>('https://localhost:5001/api/users'));
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // }
}
