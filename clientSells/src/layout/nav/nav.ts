import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '../../core/services/account-service';
import { ToastService } from '../../core/services/toast-service';
import { themes } from '../theme';
import { BusyService } from '../../core/services/busy-service';
import { User } from '../../types/user';
import { of } from 'rxjs';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit {
  protected creds: any = {};

  protected accountService = inject(AccountService);
  protected busyService = inject(BusyService);
  private router = inject(Router);
  private toast = inject(ToastService);

  protected selectedTheme = signal<string>(localStorage.getItem('theme') || 'light');
  protected themes = themes;

  protected catE = signal<string>('e');
  protected catJ = signal<string>('j');

  private user = signal<User | null>(null);

  ngOnInit(): void {
    document.documentElement.setAttribute('data-theme', this.selectedTheme());
  }

  handleSelectedTheme(theme: string) {
    this.selectedTheme.set(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);

    /* Deselect Dropdown */
    const elem = document.activeElement as HTMLDivElement;
    if (elem) elem.blur();
  }

  login() {
    /* TEST */
    // this.creds.email = 'kathy@test.com';
    // this.creds.password = 'password';
    /* ******************************* */

    this.accountService.login(this.creds).subscribe({
      next: () => {
        if (this.accountService.adminUser()) {
          this.router.navigateByUrl('/listaproductos');
        } else {
          this.router.navigateByUrl('/joyeria/{{catJ()}}');
        }

        this.toast.success('Logged in successfull');

        const userString = localStorage.getItem('user');
        if (!userString) return of(null);
        const user = JSON.parse(userString);
        this.accountService.setCurrentUser(user);
        this.creds = {};
        return;
      },
      error: (error) => {
        this.toast.error(error.error);
        console.log(error);
      },
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
    this.toast.success('Logged out successfull');
  }
}
