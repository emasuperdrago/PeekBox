import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonInput, IonButton, IonHeader, IonToolbar, IonButtons, IonBackButton, IonInputPasswordToggle } from '@ionic/angular/standalone';
// 1. Aggiungiamo il modulo di navigazione!
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.page.html',
  styleUrls: ['./registrazione.page.scss'],
  standalone: true,
  // 2. Aggiungiamo RouterModule qui in fondo:
  imports: [IonContent, IonInput, IonButton, IonHeader, IonToolbar, IonButtons, IonBackButton, CommonModule, FormsModule, RouterModule, IonInputPasswordToggle]
})
export class RegistrazionePage implements OnInit {

  // Queste tre variabili vuote raccolgono i dati
  nomeProfilo: string = '';
  email: string = '';
  password: string = '';

  constructor() { }

  ngOnInit() {
  }

}