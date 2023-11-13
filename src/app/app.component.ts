import { Component, OnInit } from '@angular/core';
import { KeycloakService } from './core/services/keycloak.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'myapp';

  protected isAuthReady = false;

  constructor(private keycloakService: KeycloakService) {};

  async ngOnInit(): Promise<void> {
    await this.keycloakService.checkIfRedirectedFromKeycloak();
    console.log('NOW ROUTE');
    this.isAuthReady = true;
  }
}
