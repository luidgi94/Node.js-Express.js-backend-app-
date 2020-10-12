// Ici, vous importez le package HTTP natif de Node et l'utilisez pour créer un serveur, en passant une fonction qui sera exécutée à chaque appel effectué vers ce serveur. Cette fonction reçoit les objets request et response en tant qu'arguments. Dans cet exemple,
//  vous utilisez la méthode end de la réponse pour renvoyer une réponse de type string à l'appelant.
const http = require('http'); 
console.log('on voit le flux du serveur en faisant une cmd : node server 2');
const server= http.createServer((req,res)=>{ // on crée serveur node  avec 2 arguments res et req
    res.end('Voila la reponse du serveur! ');
});
server.listen(process.env.PORT || 3000);
// Dans la dernière ligne, vous configurez le serveur pour qu'il écoute :
// soit la variable d'environnement du port grâce à process.env.PORT : si la plateforme de déploiement propose un port par défaut, c'est celui-ci qu'on écoutera ;
// soit le port 3000, ce qui nous servira dans le cas de notre plateforme de développement.

// Démarrez le serveur en exécutant node server à partir de la ligne de commande. Pour vérifier qu'il envoie la réponse correcte,
//  utilisez une fenêtre de navigateur pour accéder à http://localhost:3000 

