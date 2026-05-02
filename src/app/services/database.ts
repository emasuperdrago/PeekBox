import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private readonly DB_NAME = 'peekbox_v4'; // Passiamo a v4 per essere sicuri al 100%

  constructor() { }

  async initPlugin() {
    try {
      const platform = Capacitor.getPlatform();
  
      if (platform === 'web') {
        // 1. Aspettiamo che il componente sia definito
        await customElements.whenDefined('jeep-sqlite');
        
        // 2. Troviamo l'elemento nel DOM
        const jeepSqliteEl = document.querySelector('jeep-sqlite');
        
        if (jeepSqliteEl) {
          // 3. Inizializziamo il WebStore SOLO SE l'elemento esiste
          await this.sqlite.initWebStore();
          console.log('✅ WebStore inizializzato');
        } else {
          console.error('❌ Elemento <jeep-sqlite> non trovato! Controlla app.component.html');
          return; // Fermiamo l'esecuzione per evitare l'errore rosso successivo
        }
      }
  
      // Proseguiamo con la connessione
      this.db = await this.sqlite.createConnection(this.DB_NAME, false, 'no-encryption', 1, false);
      await this.db.open();
      console.log('✅ DATABASE PEEKBOX APERTO!');
      await this.creaTabelle();
  
    } catch (error) {
      console.error('❌ ERRORE INIT DB:', error);
    }
  }

  private async creaTabelle() {
    const queries = [
      `CREATE TABLE IF NOT EXISTS utenti (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL);`,
      `CREATE TABLE IF NOT EXISTS armadi (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, rif_utente INTEGER, FOREIGN KEY(rif_utente) REFERENCES utenti(id) ON DELETE CASCADE);`,
      `CREATE TABLE IF NOT EXISTS box (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, rif_armadio INTEGER, is_preferito INTEGER DEFAULT 0, FOREIGN KEY(rif_armadio) REFERENCES armadi(id) ON DELETE CASCADE);`,
      `CREATE TABLE IF NOT EXISTS oggetti (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, descrizione TEXT, tipo TEXT, fragile INTEGER DEFAULT 0, quantita INTEGER DEFAULT 1, foto TEXT, rif_box INTEGER, FOREIGN KEY(rif_box) REFERENCES box(id) ON DELETE CASCADE);`
    ];

    try {
      for (const q of queries) { 
        await this.db.execute(q); 
      }
      console.log('✅ Schema pronto su ' + this.DB_NAME);
      if (Capacitor.getPlatform() === 'web') { 
        await this.sqlite.saveToStore(this.DB_NAME); 
      }
    } catch (error) {
      console.error('❌ Errore creazione tabelle:', error);
    }
  }

  getDb(): SQLiteDBConnection { return this.db; }
}