// create-test-user.js
const bcrypt = require('bcrypt');
const db = require('./db'); // Győződj meg róla, hogy ez a helyes útvonal a db modulhoz

async function createTestUser() {
  try {
    const felhasznalonev = 'test';
    const email = 'test@test.com';
    const plainPassword = '123456'; // Válassz egy jelszót
    const role = 'user'; // Például: 'user'
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(plainPassword, saltRounds);

    // Feltételezve, hogy a "felhasznalok" tábla a fenti oszlopokkal rendelkezik, user_id automatikusan generálódik.
    const insertQuery = `
      INSERT INTO felhasznalok (felhasznalonev, email, password_hash, role)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const result = await db.query(insertQuery, [felhasznalonev, email, password_hash, role]);

    console.log('Test user created:', result.rows[0]);
    process.exit(0);
  } catch (error) {
    console.error('Error creating test user:', error);
    process.exit(1);
  }
}

createTestUser();
