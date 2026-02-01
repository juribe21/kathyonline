import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLinkActive } from '@angular/router';
import { AccountService } from '../../core/services/account-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected creds: any = {};
  protected accountService = inject(AccountService);

  login() {
    this.accountService.login(this.creds).subscribe({
      next: (result) => {
        console.log(result);

        this.creds = {};
      },
      error: (error) => {
        alert(error.message);
      },
    });
  }

  logout() {
    this.accountService.logout();
  }
}
