const express = require('express');
const path = require('path'); // traiter les route statiquse du dossier image
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/user'); // pour inscription et authentification
const stuffRoutes = require('./routes/stuff');
/* connection au cluster mongoDB */
mongoose.connect('mongodb+srv://luidgi:underworld@clusterbyluidgi.bw0ue.mongodb.net/Clusterbyluidgi?retryWrites=true&w=majority', 
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


const bodyParser = require('body-parser'); // dépendance qui traduit le json reçu par la requette en objet javascript utilisable

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images'))); // Cela indique à Express qu'il faut gérer la ressource images de manière statique (un sous-répertoire de notre répertoire de base, __dirname ) à chaque fois qu'elle reçoit une requête vers la route /images
app.use('/api/stuff', stuffRoutes); // le chemin /api/stuff est rajouté au chemin sur les stuffRoutes
app.use('/api/auth', userRoutes); // le chemin /api/auth est rajouté au chemin sur les userRoutes
module.exports = app; // on export l'app express pour l'utiliser dans toute l'application
