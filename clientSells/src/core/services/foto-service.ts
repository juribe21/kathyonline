import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Photo } from '../../types/Photo';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FotoService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  newPicture = signal<Photo | null>(null);

  getFoto(id: string) {
    return this.http.get<Photo>(this.baseUrl + 'photos/' + id + '/photo');
  }

  getFotos(id: string) {
    return this.http.get<Photo[]>(this.baseUrl + 'photos/' + id + '/photos');
  }

  uploadClientFoto(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<Photo>(this.baseUrl + 'photos/add-photo', formData).pipe(
      tap((response) => {
        if (response) {
          this.newPicture.set(response);
        }
      }),
    );
  }

  uploadFoto(file: File, id: string) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http
      .post<Photo>(this.baseUrl + 'ProductsAdmin/add-newproductpicture/' + id, formData)
      .pipe(
        tap((response) => {
          if (response) {
            this.newPicture.set(response);
          }
        }),
      );
  }

  setMainFoto(foto: Photo) {
    return this.http.put(this.baseUrl + 'photos/set-main-photo/' + foto.id, {});
  }

  deleteFoto(id: number) {
    return this.http.delete(this.baseUrl + 'photos/delete-photo/' + id);
  }
}
