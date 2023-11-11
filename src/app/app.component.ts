import { Component, OnInit } from '@angular/core';
import { KeycloakService } from './core/services/keycloak.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'myapp';

  private isAuthReady = false;

  constructor(private keycloakService: KeycloakService) {};

  ngOnInit(): void {
    console.log('APPINIT')

    this.keycloakService.checkParams();
  }
}
