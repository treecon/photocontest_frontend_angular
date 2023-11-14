import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-upload-photo',
  templateUrl: './modal-upload-photo.component.html',
  styleUrls: ['./modal-upload-photo.component.scss']
})
export class ModalUploadPhotoComponent {
  constructor(public dialogRef: MatDialogRef<null>) { }

  close() {
    this.dialogRef.close();
  }
}
