import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { defineCustomElements as pwaElements } from '@ionic/pwa-elements/loader';
import { defineCustomElements as jeepSqlite } from 'jeep-sqlite/loader';

async function startApp() {
  try {
    // Registriamo i componenti e aspettiamo che finiscano
    pwaElements();
    await jeepSqlite(window);

    // Facciamo partire l'app solo ora
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