import * as express from "express";
import {User} from './model';
import * as UserController from './userController';

export const register = (app: express.Application) => {

    let connectedUsers: string[] = [];

    app.get('/',(_,res) => res.send('Hello world from player service'));

    app.put('/user/register', (req,res) => {
        const newUser: User = req.body;
        const userName = UserController.findByName(newUser.name);
        if(userName){
            res.status(400).json("This username is already taken");
        }else{
            res.status(200).json(UserController.addUser(newUser.name,newUser.password));
        }
    });

    app.post('/user/login', (req, res) =>{
        const {name,password} = req.body;
        const user : User = UserController.login(name,password);
        if(user){
          connectedUsers.push(user.name);
          res.status(200).json(connectedUsers);
        }else{
          res.status(400).send("Invalid username or password, please try again...")
        }
      });
    
    app.get('/user/match', (req,res) => {
        const idMatch = req.query.idMatch;
        if(idMatch){
            res.send("TODO match précis");
        }else{
            res.send("TODO tous les matchs");
        }
        res.send("TODO");
    });

    app.put('/user/match/invite', (req,res) => {
        const {name} = req.body;
        if(name){
            res.status(200).send("TODO creation match");
        }else{
            res.status(200).send("TODO match vide + création requete")
        }
    });

    app.get('/user/match/getInvites', (req,res) => {
        res.status(200).json("TODO get invites");
    });

    app.post('/user/match/accept', (req,res) => {
        const idMatch = req.body;
        res.status(200).json("TODO accept match (changer statut d'un match)");
    });

    app.post('/user/match/prepareDeck', (req,res) => {

        const match = req.body.idMatch;
        

        // renvoi id match + deck au service match
        // le service match cherche le match associé, et change le deck du joueur
    });

    app.post('/user/match/fightPokemon', (req,res) => {
        // on envoi le pokemon dans l'arène
    });

    app.get('/user', (_,res) => {
        res.status(200).json(UserController.listUsers());
    });

}