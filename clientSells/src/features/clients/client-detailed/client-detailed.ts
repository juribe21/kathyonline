import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { filter, Observable } from 'rxjs';
import { Client } from '../../../types/Client';
import { AdminService } from '../../../core/services/admin-service';
import { AccountService } from '../../../core/services/account-service';
import { AgePipe } from '../../../core/pipes/age-pipe';

@Component({
  selector: 'app-client-detailed',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, AgePipe],
  templateUrl: './client-detailed.html',
  styleUrl: './client-detailed.css',
})
export class ClientDetailed implements OnInit {
  protected adminService = inject(AdminService);
  protected accountService = inject(AccountService);
  private route = inject(ActivatedRoute);

  private router = inject(Router);
  protected title = signal<string | undefined>('Perfil');

  protected isCurrentUser = computed(() => {
    return this.accountService.currentUser()?.id === this.route.snapshot.paramMap.get('id');
  });

  protected isAdministratroUser = computed(() => {
    return this.accountService.adminUser() === true;
  })

  //protected client = signal<Client | undefined>(undefined);

  ngOnInit(): void {
    /* Get information from resolver */
    // this.route.data.subscribe({
    //   next: (data) => this.client.set(data['client']),
    // });

    /* Lesson 100 section 9  */
    this.title.set(this.route.firstChild?.snapshot.title);
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe({
      next: () => {
        this.title.set(this.route.firstChild?.snapshot.title);
      },
    });
  }

  // loadClient() {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   if (!id) return;
  //   return this.adminService.getClient(id);
  // }
}
