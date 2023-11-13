import { Component, OnInit } from '@angular/core';
import { PhotosService } from 'src/app/core/services/http/photos.service';
import { ModalUploadPhotoComponent } from './components/modal-upload-photo/modal-upload-photo.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';
import { Photo } from 'src/app/core/models/photos/photo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  photos: Observable<Photo[]> = new Observable<Photo[]>();

  constructor(private photoService: PhotosService, public dialog: MatDialog) {}

  loadPhotos(): void {
    this.photos = this.photoService.getPhotos()
      .pipe(map(x => x.result))
  }

  ngOnInit(): void {
    this.loadPhotos();
  }

  // openModalUploadPhoto() {
  //   this.dialog.open(ModalUploadPhotoComponent);
  // }

  onFileSelected(e: Event) {

    const files = (e.target as HTMLInputElement).files;
    if (!files) return;

    const file = files[0];

    this.photoService.submitPhoto(file, '')
      .subscribe(x => this.loadPhotos());
  }

  trackByPhotoID(index: number, photo: Photo) {
    return photo.id;
  }
}
