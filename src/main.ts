import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { defineCustomElements as pwaElements } from '@ionic/pwa-elements/loader';
import { defineCustomElements as jeepSqlite } from 'jeep-sqlite/loader';
import { Capacitor } from '@capacitor/core';

async function startApp() {
  try {
    pwaElements();

    // --- SETUP JEEP-SQLITE PER IL WEB ---
    const platform = Capacitor.getPlatform();
    if (platform === 'web') {
      // 1. Crea l'elemento fisicamente nel body (fuori da Angular)
      const jeepSqliteEl = document.createElement('jeep-sqlite');
      document.body.appendChild(jeepSqliteEl);
      
      // 2. Registra i componenti
      await jeepSqlite(window);
      
      // 3. Aspetta che il browser lo riconosca ufficialmente
      await customElements.whenDefined('jeep-sqlite');
      console.log('Jeep-Sqlite iniettato con successo nel DOM');
    }

    // --- AVVIO APP ANGULAR ---
    await bootstrapApplication(AppComponent, {
      providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        provideIonicAngular(),
        provideRouter(routes, withPreloading(PreloadAllModules)),
      ],
    });
  } catch (err) {
    console.error('Errore durante l\'avvio dell\'app:', err);
  }
}

startApp();