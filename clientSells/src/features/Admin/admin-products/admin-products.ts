import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-admin-products',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-products.html',
  styleUrl: './admin-products.css',
})
export class AdminProducts {
  protected title = signal('Producto');
  protected accountService = inject(AccountService);
}
