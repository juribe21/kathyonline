import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../../../types/Client';
import { AsyncPipe } from '@angular/common';
import { ClientCard } from "../client-card/client-card";
import { AdminService } from '../../../core/services/admin-service';

@Component({
  selector: 'app-client-list',
  imports: [AsyncPipe, ClientCard],
  templateUrl: './client-list.html',
  styleUrl: './client-list.css',
})
export class ClientList {
  private adminService = inject(AdminService);
  protected clients$: Observable<Client[]>;

  constructor() {
    this.clients$ = this.adminService.getClients();
  }
}
