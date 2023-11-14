import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Photo } from 'src/app/core/models/photos/photo';
import { PhotosService } from 'src/app/core/services/http/photos.service';

@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.scss']
})
export class PhotoCardComponent {
  @Input() size: 'md' | 'lg' = 'md';
  @Input() isWinningPhoto = false;
  @Input() isWithActions: boolean = false;
  @Input() data!: Photo;

  @Output() voted = new EventEmitter();

  constructor(private photoService: PhotosService) { }

  vote(type: 'UP' | 'DOWN') {
    this.photoService.vote(this.data.id, type)
      .subscribe(x => this.voted.emit());
  }
}
