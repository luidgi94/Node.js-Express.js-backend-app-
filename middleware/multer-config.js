const multer = require('multer');//npm install --save multer

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {// la fonction destination indique à multer d'enregistrer les fichiers dans le dossier images ;
    callback(null, 'images'); // le null dit qu'il n'y a pas d'erreur a multer
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_'); // on retire tous les espaces du nom du fichier et on les remplace par des underscores pour eviter des erreurs
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension); // composition du nouveau nom du fichier avec le timestamp actuel
  }
});

module.exports = multer({storage: storage}).single('image'); // single indique qu'on recoit un seul fichier a la fois
