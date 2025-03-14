const express = require('express');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const db = require('./Models');
const userRoutes = require('./Routes1/userRoutes');
const tudasanyagRoutes = require('./Routes1/tudasanyagRoutes');

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware-ek
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS beállítás (frontend: 8081)
app.use(cors({
  origin: 'http://localhost:8081',
  credentials: true,
}));

// Adatbázis szinkronizálása
db.sequelize.sync({ force: false }).then(() => {
    console.log("db has been re sync");
});

// Route-ok
app.use('/api/users', userRoutes);
app.use('/api/tudasanyagok', tudasanyagRoutes);

app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
