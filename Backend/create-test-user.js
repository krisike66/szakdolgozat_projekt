const db = require('./Models');
const bcrypt = require("bcrypt");

async function createTestUser() {
  try {
    const hashedPassword = await bcrypt.hash("admin", 10);
    const newUser = await db.users.create({
      felhasznalonev: 'admin',
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
