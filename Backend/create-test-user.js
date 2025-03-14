const db = require('./Models');
const bcrypt = require("bcrypt");

async function createTestUser() {
  try {
    const hashedPassword = await bcrypt.hash("admin", 10);
    const newUser = await db.users.create({
      felhasznalonev: 'admin',  // győződj meg róla, hogy a mező neve egyezik az adatbázisban használt névvel
      email: 'admin@test.com',
      password_hash: hashedPassword,
      role: 'admin'
    });
    console.log("Test user created:", newUser);
  } catch (error) {
    console.error("Error creating test user:", error);
  }
}

createTestUser();
