import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Client } from '../../../types/Client';
import { AdminService } from '../../../core/services/admin-service';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-client-detailed',
  imports: [AsyncPipe, RouterOutlet],
  templateUrl: './client-detailed.html',
  styleUrl: './client-detailed.css',
})
export class ClientDetailed implements OnInit {
  private adminService = inject(AdminService);
  private accountService = inject(AccountService);
  private route = inject(ActivatedRoute);

  protected title = signal<string | undefined>('Perfil');
  protected isCurrentUser = computed(() => {
    return this.accountService.currentUser()?.id === this.route.snapshot.paramMap.get('id');
  });

  protected client$?: Observable<Client>;

  ngOnInit(): void {
    this.client$ = this.loadClient();
  }

  loadClient() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    return this.adminService.getClient(id);
  }
}
