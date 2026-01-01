# Resources

- [API Documentation](https://docs.spacetraders.io/)

## Fonctionnalités identifiées

## NOW

- [x] Authentication / Agent : store and use the token, display agent information.
      Requis for toutes les features suivantes.
      https://spacetraders.io/openapi#tag/accounts

## NEXT

- [x] "Star systems exploration : display a list of systems"
      Chouette si il y a du visuel. Pour motiver la construction d'une flotte et la levée de fonds, il faut des perspectives. Navigation dans un second temps.
      https://spacetraders.io/openapi#tag/systems
- [ ] "Enable navigation between star systems.""
      Permet de se déplacer entre les systèmes. Nécessite la feature précédente.
      https://spacetraders.io/openapi#tag/ships/operation/ship_navigate

- [ ] "Fleet management : display the agent’s ships and their information.""
      Gestion et navigation. Grosse épique.
      https://spacetraders.io/openapi#tag/fleet

## LATER

- [ ] "Markets and trading : display markets and their resources."
      On explore d'abord on vend après.

- [ ] "Trading bots for automated trading."
      Nécessite du backend tiers pour faire tourner les bots en continu.

- [ ] "Real-time notifications or events."
      Pour le confort. Utile si on a des départs des vaisseaux à gérer.
      https://spacetraders.io/openapi#tag/data/GET/my/socket.io
      API non supportée pour l'instant.

- [ ] "Stellar map visualization."
      Revamp de l'exploration stellaire avec des projections cartographiques
