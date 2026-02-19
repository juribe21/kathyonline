import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  imports: [],
  templateUrl: './image-upload.html',
  styleUrl: './image-upload.css',
})
export class ImageUpload {
  protected imgSource = signal<string | ArrayBuffer | null | undefined>(null);
  protected isDragging = false;
  private fileToupdload: File | null = null;
  uploadFile = output<File>();
  loading = input<boolean>();

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      this.previewImage(file);
      this.fileToupdload = file;
    }
  }

  onCancel() {
    this.fileToupdload = null;
    this.imgSource.set(null);
  }

  onUploadFile() {
    if (this.fileToupdload) {
      this.uploadFile.emit(this.fileToupdload);
    }
  }

  private previewImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => this.imgSource.set(e.target?.result);
    reader.readAsDataURL(file);
  }
}
