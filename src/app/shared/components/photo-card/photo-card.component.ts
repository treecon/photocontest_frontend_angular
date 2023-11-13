import { Component, Input } from '@angular/core';
import { Photo } from 'src/app/core/models/photos/photo';

@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.scss']
})
export class PhotoCardComponent {
  @Input() size: 'md' | 'lg' = 'md';
  @Input() data!: Photo;
}
