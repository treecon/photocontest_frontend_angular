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

  getPhotos() {
    return this.httpClient.get<ServerResponse<Photo[]>>('http://localhost:3000/api/photo')
      .pipe(take(1));
  }

  submitPhoto(photo: File, filename: string) {
    const formData = new FormData();

    // formData.append('photo', new Blob([photo]), filename);
    formData.append('photo', photo);

    console.log(formData);

    return this.httpClient.post<ServerResponse<null>>('http://localhost:3000/api/photo', formData)
      .pipe(take(1));
  }
}
