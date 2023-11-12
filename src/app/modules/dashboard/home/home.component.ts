import { Component, OnInit } from '@angular/core';
import { PhotosService } from 'src/app/core/services/http/photos.service';
import { ModalUploadPhotoComponent } from './components/modal-upload-photo/modal-upload-photo.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  photos: any;

  constructor(private photoService: PhotosService, public dialog: MatDialog) {}

  loadPhotos(): void {
    this.photos = this.photoService.getPhotos()
  }

  ngOnInit(): void {
    this.loadPhotos();
  }

  // openModalUploadPhoto() {
  //   this.dialog.open(ModalUploadPhotoComponent);
  // }

  onFileSelected() {
    // todo: change querySelector
    const inputNode: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        const photo: ArrayBuffer = e.target.result;

        console.log(photo);

        this.photoService.submitPhoto(photo).subscribe();
      };
  
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
}
