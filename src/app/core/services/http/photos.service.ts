import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';
import { ServerResponse } from '../../models/response-generic';
import { Photo } from '../../models/photos/photo';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private httpClient: HttpClient) { }

  // this is wrong practice but is done due to deployment issues
  // (no web server is set to redirect /api requests)
  // also, i have not yet found a way to proxy requests in production (only in development server)
  // an interceptor could be a solution
  baseURL = 'http://85.208.48.165:3005';

  getPhotos(size: number, isPublic = false) {
    const url = isPublic ? `${this.baseURL}/api/photo/public?size=${size}` : `${this.baseURL}/api/photo?size=${size}`;

    return this.httpClient.get<ServerResponse<Photo[]>>(url)
      .pipe(take(1));
  }

  submitPhoto(photo: File, filename: string) {
    const formData = new FormData();

    // formData.append('photo', new Blob([photo]), filename);
    formData.append('photo', photo);

    return this.httpClient.post<ServerResponse<null>>(`${this.baseURL}/api/photo`, formData)
      .pipe(take(1));
  }

  vote(photoID: string, type: 'UP' | 'DOWN') {
    return this.httpClient.post<ServerResponse<null>>(`${this.baseURL}/api/photo/${photoID}/${type.toLowerCase()}`, null)
      .pipe(take(1));
  }
}
