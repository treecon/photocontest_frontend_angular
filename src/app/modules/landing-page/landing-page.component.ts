import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PhotoCardComponent } from 'src/app/shared/components/photo-card/photo-card.component';
import {
  isLoadingSelector,
  tokensSelector,
} from 'src/app/core/store/auth/selectors';
import { AppState } from 'src/app/core/models/state';
import { lastValueFrom, Observable } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  // tokens: Observable<{ accessToken: string, refreshToken: string, idToken: string }> | null;

  constructor(private store: Store<AppState>) {
    this.store.pipe(select(tokensSelector)).subscribe((x) => {
      console.log(x);
    });
  }

  getStoreItem() {
    console.log(1)
    // console.log(this.tokens ? lastValueFrom(this.tokens) : null);
  }
}
