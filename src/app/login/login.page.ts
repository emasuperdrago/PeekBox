import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonInput, IonButton, IonInputPasswordToggle} from '@ionic/angular/standalone';
// Modulo per far funzionare i link!
import { RouterModule } from '@angular/router';
// Per gestire l'alert della password dimenticata
import { AlertController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  
  imports: [IonContent, IonInput, IonButton, CommonModule, FormsModule, RouterModule, IonInputPasswordToggle]
})
export class LoginPage implements OnInit {

  // Creiamo le due variabili per il form di login
  email: string = '';
  password: string = '';

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  //Funzione per il pop-up password dimenticata
  async recuperaPassword(event: Event) {
    event.preventDefault(); // Evita che il link ricarichi la pagina a vuoto

    const alert = await this.alertController.create({
      header: 'Recupero Password',
      message: 'Inserisci la tua email. Ti invieremo un link per creare una nuova password.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'nome@esempio.it'
        }
      ],
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel' // Chiude il pop-up senza fare nulla
        },
        {
          text: 'Invia',
          handler: (dati) => {
            // Qui in futuro ci sarà il collegamento col database!
            console.log('L\'utente ha chiesto il recupero per: ', dati.email);
          }
        }
      ]
    });

    await alert.present();
  }

}