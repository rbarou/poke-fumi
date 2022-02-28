# Poke-services

## Scénario:

### lancer Docker compose 
à la racine du projet:
```docker-compose up```

## Partie joueur:
### Créer trois comptes pour Sasha, Ondine et Pierre:
requête:
```curl --request POST \
  --url http://localhost/api/players/user/register \
  --header 'Content-Type: application/json' \
  --data '{
	"name":"Sasha",
	"password":"pikachu"
}
```
requête:
```curl --request POST \
  --url http://localhost/api/players/user/register \
  --header 'Content-Type: application/json' \
  --data '{
	"name":"Ondine",
	"password":"togepi"
}
```
requête:
```curl --request POST \
  --url http://localhost/api/players/user/register \
  --header 'Content-Type: application/json' \
  --data '{
	"name":"Pierre",
	"password":"InfirmiereJoelle<3"
}
```
### Se connecter au compte de Sacha, bien récupérer le token en retour pour le placer dans les requêtes suivantes!:
requête
```
curl --request POST \
  --url http://localhost/api/auth/player/login \
  --header 'Content-Type: application/json' \
  --data '{
	"name":"Sasha",
	"password":"pikachu"
}
```
### Vérifier qu'on ne peut pas faire d'autres requêtes sans le token (liste de joueurs):
requête
```
curl --request GET \
  --url http://localhost/api/players/user/getAllUsers
```

### Voir la liste des joueurs et leur score
requête
```
curl --request GET \
  --url http://localhost/api/players/user/getAllUsers \
  --header 'auth-token: [MON TOKEN]'
```

### Liste des matchs (WIP)
### Details d'un match (WIP)
### Inviter un autre joueur à un match (WIP)
### Consulter les invitations reçues (WIP)
### accepter une invitaton à un match (WIP)
### Créer un deck pour un match (WIP)


## Partie admin:

### Envoyer un pokemon à l'arène et voir le résultat du combat (WIP)
### Voir liste des joueurs 
### Voir liste matchs
### Effacer joueur (Pierre)
requête:
```
curl --request DELETE \
  --url http://localhost:5000/user/remove \
  --header 'Content-Type: application/json' \
  --data '{
	"id":"3"
}
'
```
