// script to remove admin user by email in SQLite used by Strapi
const Database = require('better-sqlite3');
const path = require('path');
const dbPath = path.join(__dirname, '..', '.tmp', 'data.db');
const email = process.argv[2];
if (!email) {
  console.error('Usage: node scripts/remove-admin.js <email>');
  process.exit(1);
}
const db = new Database(dbPath);
try {
  // Strapi stores admin users in 'admin_users' table in this template
  const row = /** @type {{ id: number; email: string } | undefined } */ (db.prepare('SELECT id, email FROM admin_users WHERE email = ?').get(email));
  if (!row) {
    console.log('No admin with email', email);
    process.exit(0);
  }
  const del = db.prepare('DELETE FROM admin_users WHERE id = ?');
  const info = del.run(row.id);
  console.log('Deleted admin', row.email, 'id', row.id, 'changes', info.changes);
} catch (err) {
  console.error('Error:', err.message);
  process.exit(2);
} finally {
  db.close();
}
