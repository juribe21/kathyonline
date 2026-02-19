import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../../../types/Photo';
import { FotoService } from '../../../core/services/foto-service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ClientService } from '../../../core/services/client-service';
import { AdminService } from '../../../core/services/admin-service';
import { ImageUpload } from '../../../shared/image-upload/image-upload';

@Component({
  selector: 'app-client-foto',
  imports: [ImageUpload],
  templateUrl: './client-foto.html',
  styleUrl: './client-foto.css',
})
export class ClientFoto implements OnInit {
  private route = inject(ActivatedRoute);
  //protected foto = signal<Photo | undefined>(undefined);
  private fotoService = inject(FotoService);
  protected adminService = inject(AdminService);

  // like a photos
  protected photo = signal<Photo | undefined>(undefined);
  protected loading = signal(false);

  constructor() {
    const clientId = this.route.parent?.snapshot.paramMap.get('id');
    if (clientId) {
      this.fotoService.getFotos(clientId).subscribe({
        next: (photo) => this.photo.set(photo),
      });
    }
  }

  ngOnInit(): void {
    // this.route.parent?.data.subscribe((data) => {
    //   this.foto.set(data['photo']);
    // });
  }

  onUploadImafe(file: File) {
    this.loading.set(true);
    this.fotoService.uploadFoto(file).subscribe({
      next: (returnFoto) => {
        this.adminService.editMode.set(false);
        this.loading.set(false);
        this.photo.set(returnFoto);
      },
      error: (error) => {
        console.log('Error uploading imagen!!', error);
        this.loading.set(false);
      },
    });
  }
}
