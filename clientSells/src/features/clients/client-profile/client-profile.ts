import {
  Component,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
  viewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client, EditableClient } from '../../../types/Client';
import { DatePipe, NgFor } from '@angular/common';
import { AdminService } from '../../../core/services/admin-service';
import { FormsModule, NgForm } from '@angular/forms';
import { AccountService } from '../../../core/services/account-service';
import { ToastService } from '../../../core/services/toast-service';

@Component({
  selector: 'app-client-profile',
  imports: [DatePipe, FormsModule],
  templateUrl: './client-profile.html',
  styleUrl: './client-profile.css',
})
export class ClientProfile implements OnInit, OnDestroy {
  @ViewChild('editForm') editForm?: NgForm;
  @HostListener('window:beforeunload', ['$event']) notify($event: BeforeUnloadEvent) {
    if (this.editForm?.dirty) {
      $event.preventDefault();
    }
  }
  private route = inject(ActivatedRoute);
  private accountService = inject(AccountService);
  protected adminService = inject(AdminService);
  // protected client = signal<Client | undefined>(undefined);
  private toast = inject(ToastService);

  protected editableClient: EditableClient = {
    clientIdToUpdate: '',
    name: '',
    lastName: '',
    email: '',
    telefono: '',
    description: '',
    isAdmin: false,
  };

  ngOnInit(): void {
    /* Ver Leccion 116 Secc 10 */
    // this.route.parent?.data.subscribe((data) => {
    //   this.client.set(data['client']);
    // });

    this.editableClient = {
      clientIdToUpdate: this.adminService.client()?.id || '',
      name: this.adminService.client()?.name || '',
      lastName: this.adminService.client()?.lastName || '',
      email: this.adminService.client()?.email || '',
      telefono: this.adminService.client()?.telefono || '',
      description: this.adminService.client()?.description || '',
      isAdmin: this.accountService.adminUser() ? true : false,
    };
  }

  updateProfile() {
    if (!this.adminService.client()) return;

    const updatedClient = { ...this.adminService.client(), ...this.editableClient };
    this.adminService.updateMember(this.editableClient).subscribe({
      next: () => {
        const currentUser = this.accountService.currentUser();

        if (!this.accountService.adminUser()) {
          if (currentUser && updatedClient.name !== currentUser?.name) {
            currentUser.name = updatedClient.name;
            this.accountService.setCurrentUser(currentUser);
          }
        }

        this.toast.success('Profile updated successfully');
        this.adminService.editMode.set(false);
        this.adminService.client.set(updatedClient as Client);
        this.editForm?.reset(updatedClient);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.adminService.editMode()) {
      this.adminService.editMode.set(false);
    }
  }
}
