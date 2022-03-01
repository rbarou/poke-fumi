# Poke-services

## Scénario:

### builder les images docker,
## dans chaque repertoire correspondant:
```docker build -t matchs:v1```
```docker build -t auth:v1```
```docker build -t players:v1```
```docker build -t fights:v1```

### lancer Docker compose 
à la racine du projet:
```docker-compose up```

## Partie joueur:
### Créer trois comptes pour Sasha, Ondine et Pierre:
requête:
```curl --request POST \
  --url localhost/api/players/user/register \
  --header 'Content-Type: application/json' \
  --data '{
	"name":"Sasha",
	"password":"pikachu"
}'
```
requête:
```curl --request POST \
  --url localhost/api/players/user/register \
  --header 'Content-Type: application/json' \
  --data '{
	"name":"Ondine",
	"password":"togepi"
}'
```
requête:
```curl --request POST \
  --url localhost/api/players/user/register \
  --header 'Content-Type: application/json' \
  --data '{
	"name":"Pierre",
	"password":"InfirmiereJoelle"
}'
```
### Se connecter au compte de Sacha, bien récupérer le token en retour pour le placer dans les requêtes suivantes!:
requête
```
curl --request POST \
  --url localhost/api/auth/auth/player/login \
  --header 'Content-Type: application/json' \
  --data '{
	"name":"Sasha",
	"password":"pikachu"
}'
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
  --url localhost/api/players/user/getAllUsers \
  --header 'auth-token: [MON TOKEN]'
```


### Inviter un autre joueur à un match 
requête
```
curl --request PUT \
  --url localhost/api/matchs/match/invite \
  --header 'Content-Type: application/json' \
  --data '{
	"host":2,
	"guest":1
}'
```
requête
```
curl --request PUT \
  --url localhost/api/matchs/match/invite \
  --header 'Content-Type: application/json' \
  --data '{
	"host":1,
	"guest":2
}'
```

### Liste des matchs
requête
```
curl --request GET \
  --url localhost/api/matchs/match/getAllMatchs


### Details d'un match
requête
```
curl --request GET \
  --url localhost/api/matchs/match/getMatch \
  --header 'Content-Type: application/json' \
  --data '{
	"match_id":1
}'
```

### Consulter les invitations reçues 
requête
```
curl --request GET \
  --url localhost/api/matchs/match/getInvites \
  --header 'Content-Type: application/json' \
  --data '{
	"userID":1
}'
```
### accepter une invitaton à un match
requête
```
curl --request PUT \
  --url localhost/matchs/match/accept \
  --header 'Content-Type: application/json' \
  --data '{
	"matchID":1,
	"guestID":1,
	"hostID":2
}'
```

### Créer un deck pour un match (WIP)

### Envoyer un pokemon à l'arène et voir le résultat du combat (WIP)

## Partie admin:


### Voir liste des joueurs 
requête:
```
curl --request GET \
  --url localhost/api/players/user/getAllUsers \
  --header 'auth-token: [MON TOKEN]'
```


### Voir liste matchs

requête
```
curl --request GET \
  --url localhost/api/matchs/match/getAllMatchs
```

### Effacer joueur (Pierre)
requête:
```
curl --request DELETE \
  --url lolcahost/api/players/user/remove \
  --header 'Content-Type: application/json' \
  --data '{
	"id":"3"
}
'
```

## Fights

### Rajouter un pokemon (pikachu)
curl --request POST \
  --url http://localhost/api/fights/pokemon \
  --header 'Content-Type: application/json' \
  --data '{
	"id":25
}'
### Rajouter un deuxième pokemon (raticate)
curl --request POST \
  --url http://localhost/api/fights/pokemon \
  --header 'Content-Type: application/json' \
  --data '{
	"id":20
}'

### Récupérer tous les pokemons
curl --request GET \
  --url 'http://localhost/api/fights/pokemon?=' \
  --header 'Content-Type: application/json'

### Créer un combat
curl --request POST \
  --url http://localhost/api/fights/fight \
  --header 'Content-Type: application/json' \
  --data '{
	"id":25
}'

### Voir les combats
curl --request GET \
  --url http://localhost/api/fights/fight

### Ajouter un pokemon à un combat
curl --request PUT \
  --url http://localhost/api/fights/fight/pokemon \
  --header 'Content-Type: application/json' \
  --data '{
	"fight" : "1",
	"pokemon" : "20"
}'

### Ajouter un deuxième pokemon à un combat
curl --request PUT \
  --url http://localhost/api/fights/fight/pokemon \
  --header 'Content-Type: application/json' \
  --data '{
	"fight" : "1",
	"pokemon" : "25"
}'