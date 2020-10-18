//Routeur gère que les requetes post: creation d'enregistrement d'objet dans la base de données

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const stuffCtrl = require('../controllers/stuff');
const multer = require('../middleware/multer-config');

// Attention le middleware "auth" est toujour le premier argument pour des question de sécurité 
router.get('/',auth, stuffCtrl.getAllStuff);
router.post('/',auth, multer, stuffCtrl.createThing);
router.get('/:id',auth, stuffCtrl.getOneThing);
router.put('/:id', multer, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);

module.exports = router;







// attention ! gère tous types de requetes mettre les requetes post avant! 
// Routeur.use('/', (req, res, next) => { 
//     Thing.find() // renvoi tous les objets de la collection Thing sur mongoDB
//     .then(things => res.status(200).json(things))
//     .catch(error => res.status(400).json({ error }));
//   });
  




