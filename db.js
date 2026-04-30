const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");

const db = new sqlite3.Database("./db/database.sqlite", (err) => {
  if (err) console.error(err.message);
  else console.log("Connected to SQLite DB");
});

// Creazione tabella
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  )
`);

async function putData() {
  try {
    const saltRounds = 10;

    const hash1 = await bcrypt.hash('password1', saltRounds);
    const hash2 = await bcrypt.hash('password2', saltRounds);

    db.run(
      `INSERT OR IGNORE INTO users (id, email, password) VALUES (?, ?, ?)`,
      [1, 'mario@example.com', hash1.toString()],
      (err) => {
        if (err) console.error(err);
      }
    );

    db.run(
      `INSERT OR IGNORE INTO users (id, email, password) VALUES (?, ?, ?)`,
      [2, 'lucia@example.com', hash2.toString()],
      (err) => {
        if (err) console.error(err);
      }
    );

  } catch (err) {
    console.error(err);
  }
}

putData();

module.exports = db;