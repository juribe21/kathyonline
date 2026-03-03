import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../../../types/Photo';
import { FotoService } from '../../../core/services/foto-service';

import { ClientService } from '../../../core/services/client-service';
import { AdminService } from '../../../core/services/admin-service';
import { ImageUpload } from '../../../shared/image-upload/image-upload';
import { AccountService } from '../../../core/services/account-service';
import { User } from '../../../types/user';
import { Client } from '../../../types/Client';
import { ToastService } from '../../../core/services/toast-service';

@Component({
  selector: 'app-client-foto',
  imports: [ImageUpload],
  templateUrl: './client-foto.html',
  styleUrl: './client-foto.css',
})
export class ClientFoto implements OnInit {
  private route = inject(ActivatedRoute);
  protected clientService = inject(ClientService);
  protected accountService = inject(AccountService);
  //protected foto = signal<Photo | undefined>(undefined);
  private fotoService = inject(FotoService);
  protected adminService = inject(AdminService);
  private toastService = inject(ToastService);

  // like a photos
  protected photo = signal<Photo | undefined>(undefined);
  protected photos = signal<Photo[]>([]);
  protected loading = signal(false);

  constructor() {
    this.loadImages();
  }

  ngOnInit(): void {
    // this.route.parent?.data.subscribe((data) => {
    //   this.foto.set(data['photo']);
    // });
  }

  loadImages() {
    const clientId = this.route.parent?.snapshot.paramMap.get('id');
    if (clientId) {
      this.fotoService.getFotos(clientId).subscribe({
        next: (photos) => this.photos.set(photos),
      });
    }
  }

  onUploadImage(file: File) {
    this.loading.set(true);
    this.fotoService.uploadClientFoto(file).subscribe({
      next: (returnFoto) => {
        this.adminService.editMode.set(false);
        this.loading.set(false);
        this.photo.set(returnFoto);
        this.loadImages();
      },
      error: (error) => {
        console.log('Error uploading imagen!!', error);
        this.loading.set(false);
      },
    });
  }

  protected setMainPhoto(event: Event, photo: Photo) {
    this.fotoService.setMainFoto(photo).subscribe({
      next: () => {
        const currentUser = this.accountService.currentUser();
        if (currentUser) currentUser.imageUrl = photo.url;
        this.accountService.setCurrentUser(currentUser as User);
        this.adminService.client.update(
          (cliente) =>
            ({
              ...cliente,
              imageUrl: photo.url,
            }) as Client,
        );
        this.toastService.success('Foto establecida como principal');
      },
    });
  }

  setDefault(event: Event, id: number) {}

  eliminarFoto(event: Event, id: number) {
    event.stopPropagation();

    this.fotoService.deleteFoto(id).subscribe({
      next: () => {
        this.toastService.success('Foto Eliminada');
        this.loadImages();
      },
      error: () => {
        this.toastService.error('Problemas para eliminar la foto');
      },
    });
  }

  // private setMainPhoto(photo: Photo) {
  //   const currentUser = this.accountService.currentUser();
  //   if (currentUser) currentUser.imageUrl = photo.url;
  //   this.accountService.setCurrentUser(currentUser as User);
  //   this.clientService.member.update(
  //     (member) =>
  //       ({
  //         //Update Signal member
  //         ...member,
  //         imageUrl: photo.url,
  //       }) as Client,
  //   );
  // }
}
