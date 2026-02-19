import { Component, inject, signal } from '@angular/core';
import { AccountService } from '../../../core/services/account-service';
import { FotoService } from '../../../core/services/foto-service';
import { AdminService } from '../../../core/services/admin-service';
import { Photo } from '../../../types/Photo';
import { ImageUpload } from "../../../shared/image-upload/image-upload";

@Component({
  selector: 'app-add-product',
  imports: [ImageUpload],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct {
  protected accountService = inject(AccountService);
  private fotoService = inject(FotoService);
  protected adminService = inject(AdminService);
  protected loading = signal(false);
  protected photo = signal<Photo | undefined>(undefined);

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
