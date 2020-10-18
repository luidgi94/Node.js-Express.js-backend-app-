console.log('on voit le flux du serveur en faisant une cmd : node server ou nodemon server ce qui est mieux');

// Ici, vous importez le package HTTP natif de Node et l'utilisez pour créer un serveur, en passant une fonction qui sera exécutée à chaque appel effectué vers ce serveur. Cette fonction reçoit les objets request et response en tant qu'arguments. Dans cet exemple,
//  vous utilisez la méthode end de la réponse pour renvoyer une réponse de type string à l'appelant.
const http = require('http'); 
const app = require('./app'); // on importe express
const normalizePort = val => { // config du port d'écoute des requettes . renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne ;
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };
  const port = normalizePort(process.env.PORT || '3000');
  app.set('port', port);
  
  const errorHandler = error => { // recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur ;
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
  

const server= http.createServer(app) ;// on crée serveur node  avec l'argument app de express



// Dans la dernière ligne, vous configurez le serveur pour qu'il écoute :
// soit la variable d'environnement du port grâce à process.env.PORT : si la plateforme de déploiement propose un port par défaut, c'est celui-ci qu'on écoutera ;
// soit le port 3000, ce qui nous servira dans le cas de notre plateforme de développement.

// Démarrez le serveur en exécutant node server à partir de la ligne de commande. Pour vérifier qu'il envoie la réponse correcte,
//  utilisez une fenêtre de navigateur pour accéder à http://localhost:3000 

server.on('error', errorHandler);
server.on('listening', () => { 
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
}); 

server.listen(port); // un écouteur d'évènements est également enregistré, consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console.


//CORS signifie « Cross Origin Resource Sharing ». Il s'agit d'un système de sécurité qui, par défaut,
// bloque les appels HTTP d'être effectués entre des serveurs différents, ce qui empêche donc les requêtes malveillantes d'accéder à des ressources sensibles. Dans notre cas, nous avons deux origines : localhost:3000 et localhost:4200 , et nous souhaiterions qu'elles puissent communiquer entre elles.
// Pour cela, nous devons ajouter des headers à notre objet  response . 