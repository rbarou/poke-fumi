import * as express from "express";
import {User} from './model';
import * as UserController from './userController';


export const register = (app: express.Application) => {
    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({ extended: true }));

    let connectedUsers: string[] = [];

    app.get('/',(_,res) => res.send('Hello world from player service'));

    app.get('/user/getAllUsers', (_,res) => {
        res.status(200).json(UserController.listUsers());
    });

    app.get('/user/getUserByName',(req,res) => {
        const name = req.query.name as string;
        if(name){
            res.status(200).json(UserController.getUserByName(name));
        }else{
            res.status(400).json("Please specify a username");
        }
    });

    app.get('/user/getUserById',(req,res) => {
        const id = req.query.id as string;
        if(id){
            res.status(200).json(UserController.getUserById(id));
        }else{
            res.status(400).json("Please specify an id");
        }
    });

    app.post('/user/register', (req,res) => {
        const newUser: User = req.body;
        const userName = UserController.getUserByName(newUser.name);
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

    app.delete('/user/remove',(req,res) => {
        const {id} = req.body;
        const user_id = UserController.getUserById(id);
        if(user_id){
            UserController.removeUser(id);
            res.status(200).json("The user: " + id + " has been removed");
        }else{
            res.status(400).send("Please check the user's id");
        }
    });

}