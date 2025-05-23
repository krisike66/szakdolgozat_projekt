const express = require('express');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const db = require('./Models');
const userRoutes = require('./Routes1/userRoutes');
const tudasanyagRoutes = require('./Routes1/tudasanyagRoutes');
const cimkeRoutes = require('./Routes1/cimkeRoutes');
const kategoriakRoutes = require('./Routes1/kategoriakRoutes');
const ertesitesRoutes = require('./Routes1/ertesitesRoutes');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors({
  origin: 'http://localhost:8081',
  credentials: true,
}));

db.sequelize.sync({ alter: true }).then(() => {
    console.log("db has been re sync");
});

app.use('/api/users', userRoutes);
app.use('/api/tudasanyagok', tudasanyagRoutes);
app.use('/api/cimkek', cimkeRoutes);
app.use('/api/kategoriak', kategoriakRoutes);
app.use('/api', require('./Routes1/logsRoutes'));
app.use('/api', require('./Routes1/kommentErtekelesRoutes'));
app.use('/api/ertesitesek', ertesitesRoutes);

app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
