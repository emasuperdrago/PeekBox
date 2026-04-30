import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { DatabaseService } from './services/database'; 

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements AfterViewInit {
  
  constructor(private dbService: DatabaseService) {}

  // Questo scatta SOLO quando l'HTML è stato caricato al 100%
  async ngAfterViewInit() {
    console.log('Avvio inizializzazione database...');
    
    // Ora il tag <jeep-sqlite> esiste fisicamente sulla pagina, possiamo accenderlo
    await this.dbService.initPlugin();
    
    console.log('App pronta e Database configurato!');
  }
}
