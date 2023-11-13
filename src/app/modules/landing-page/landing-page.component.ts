import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PhotoCardComponent } from 'src/app/shared/components/photo-card/photo-card.component';
import {
  isLoadingSelector,
  tokensSelector,
} from 'src/app/core/store/auth/selectors';
import { AppState } from 'src/app/core/models/state';
import { lastValueFrom, map, Observable } from 'rxjs';
import { PhotosService } from 'src/app/core/services/http/photos.service';
import { Photo } from 'src/app/core/models/photos/photo';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  // tokens: Observable<{ accessToken: string, refreshToken: string, idToken: string }> | null;
  photos: Photo[] | null = null;

  constructor(private photoService: PhotosService) {}

  ngOnInit(): void {
    this.photoService.getPhotos(5, true)
      .pipe(
        map((x) => x.result),
      )
      .subscribe((x) => this.photos = x);
  }

  filteredPhotosForBottomSection(photos: Photo[]) {
    if (!photos) return [];
    return this.photos?.filter((x, i) => i > 0);
  }
}
