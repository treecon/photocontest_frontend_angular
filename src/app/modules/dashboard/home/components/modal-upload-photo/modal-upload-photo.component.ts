import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-modal-upload-photo',
  templateUrl: './modal-upload-photo.component.html',
  styleUrls: ['./modal-upload-photo.component.scss']
})
export class ModalUploadPhotoComponent {
  constructor(private formBuilder: FormBuilder) {}

  uploadPhotoForm = this.formBuilder.group({
    photo: [null, Validators.required],
  })

  submit() {
    console.log('submit');
  }
}
