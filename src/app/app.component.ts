import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { DatabaseService } from './services/database'; 

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Fondamentale per riconoscere <jeep-sqlite>
})
export class AppComponent implements AfterViewInit {
  
  constructor(private dbService: DatabaseService) {}

  // Questo scatta SOLO quando l'HTML è stato caricato al 100%
  async ngAfterViewInit() {
    // Usiamo un piccolo timeout per dare a Safari il tempo di "montare" il componente jeep-sqlite
    setTimeout(async () => {
      try {
        console.log('--- Avvio inizializzazione database PeekBox ---');
        
        // Inizializziamo il plugin
        await this.dbService.initPlugin();
        
        console.log('✅ App pronta e Database configurato correttamente!');
      } catch (err) {
        console.error('❌ Errore critico durante l\'avvio:', err);
      }
    }, 600); // 600ms sono il "punto dolce" per evitare l'errore getHostRef su Safari
  }
}
