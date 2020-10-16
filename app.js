const express = require('express');
const app = express();
const Thing = require('./models/thing');
/* connection au cluster mongoDB */
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://luidgi:underworld@clusterbyluidgi.bw0ue.mongodb.net/Clusterbyluidgi?retryWrites=true&w=majority', 
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


const bodyParser = require('body-parser'); // dependance qui traduit le json recu par la requette en objet javascript utilisable
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());
app.post('/api/stuff', (req, res, next) => { // gère que les requetes post: creation d'enregistrement d'objet dans la base de données
  console.log(req.body);
  delete req.body._id;
  const thing = new Thing({
    ...req.body
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/stuff/:id', (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});

app.put('/api/stuff/:id', (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});


app.use('/api/stuff', (req, res, next) => { // attention ! gère tous types de requetes mettre les requetes post avant! 
    Thing.find() // renvoi tous les objets de la collection Thing sur mongoDB
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
  });
 
module.exports = app; // on export l'app express pour l'uttiliser dans toute l'application
