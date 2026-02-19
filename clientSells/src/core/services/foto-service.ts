import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Photo } from '../../types/Photo';

@Injectable({
  providedIn: 'root',
})
export class FotoService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getFotos(id: string) {
    return this.http.get<Photo>(this.baseUrl + 'photos/' + id + '/photo');
  }

  uploadFoto(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<Photo>(this.baseUrl + 'photos/add-photo', formData);
  }

  setMainFoto(foto: Photo) {
    return this.http.post<Photo>(this.baseUrl + 'photos/add-photo', foto);
  }

  deleteFoto(foto: Photo) {
    return this.http.post<Photo>(this.baseUrl + 'photos/add-photo', foto);
  }
}
