import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private httpClient: HttpClient) { }

  getPhotos() {
    return this.httpClient.get('http://localhost:3000/api/photo')
      .pipe(take(1));
  }

  submitPhoto(photo: ArrayBuffer) {
    const formData = new FormData();

    formData.append('photo', new Blob([photo]));

    console.log(formData);

    return this.httpClient.post('http://localhost:3000/api/photo', formData)
      .pipe(take(1));
  }
}
