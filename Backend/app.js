const express = require('express');
const { Sequelize } = require('sequelize');
const path = require('path');
const dotenv = require('dotenv')


dotenv.config()

const gifRoutes = require('./routes/gif');
const userRoutes = require('./routes/user');


const sequelize = new Sequelize('groupomania', 'Admin', 'Azerty12', {
  host: 'localhost',
  dialect:'mysql'
});

try {
  sequelize.authenticate();
  console.log('Connecté à la base de données MySQL!');
} catch (error) {
  console.error('Impossible de se connecter, erreur suivante :', error);
}



const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/images', express.static(path.join(__dirname, '/images')));
app.use('/api/gif', gifRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;