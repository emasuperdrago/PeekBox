const sqlite3 = require("sqlite3").verbose();

// Crea la connessione (se il file non esiste, lo crea nuovo vuoto)
const db = new sqlite3.Database("./db/database.sqlite", (err) => {
  if (err) {
    console.error("Errore di connessione:", err.message);
  } else {
    console.log("Connected to SQLite DB - Creazione tabelle PeekBox in corso...");
  }
});

// Creazione delle tabelle in base al Diagramma E-R del progetto
db.serialize(() => {
  
  // 1. Tabella UTENTE
  db.run(`
    CREATE TABLE IF NOT EXISTS Utente (
      id_utente INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      nome_profilo TEXT,
      is_admin BOOLEAN DEFAULT 0
    )
  `);

  // 2. Tabella ARMADIO
  db.run(`
    CREATE TABLE IF NOT EXISTS Armadio (
      id_armadio INTEGER PRIMARY KEY AUTOINCREMENT,
      nome_armadio TEXT NOT NULL,
      rif_utente INTEGER NOT NULL,
      FOREIGN KEY (rif_utente) REFERENCES Utente (id_utente) ON DELETE CASCADE
    )
  `);

  // 3. Tabella BOX
  db.run(`
    CREATE TABLE IF NOT EXISTS Box (
      id_box INTEGER PRIMARY KEY AUTOINCREMENT,
      nome_box TEXT NOT NULL,
      is_preferito BOOLEAN DEFAULT 0,
      is_eliminato BOOLEAN DEFAULT 0,
      data_eliminazione TEXT,
      rif_armadio INTEGER NOT NULL,
      FOREIGN KEY (rif_armadio) REFERENCES Armadio (id_armadio) ON DELETE CASCADE
    )
  `);

  // 4. Tabella OGGETTO
  db.run(`
    CREATE TABLE IF NOT EXISTS Oggetto (
      id_ogg INTEGER PRIMARY KEY AUTOINCREMENT,
      nome_ogg TEXT NOT NULL,
      descrizione TEXT,
      url_img TEXT,
      is_fragile BOOLEAN DEFAULT 0,
      quantita INTEGER NOT NULL DEFAULT 1,
      rif_box INTEGER NOT NULL,
      FOREIGN KEY (rif_box) REFERENCES Box (id_box) ON DELETE CASCADE
    )
  `);

  console.log("Tabelle PeekBox create con successo!");
});

module.exports = db;