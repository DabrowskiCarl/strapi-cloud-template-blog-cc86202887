const Database = require('better-sqlite3');
const path = require('path');
const dbPath = path.join(__dirname, '..', '.tmp', 'data.db');
try {
  const db = new Database(dbPath);
  const rows = /** @type {{ name: string }[]} */ (db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all());
  console.log('Tables:', rows.map(r => r.name));
  db.close();
} catch (err) {
  console.error('Error listing tables:', err && err.stack ? err.stack : err);
  process.exit(1);
}
