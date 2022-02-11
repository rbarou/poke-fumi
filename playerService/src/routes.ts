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

    app.get('/user/login', (req,res) => {
        const {name,password} = req.body;
        const user : User = UserController.login(name,password);
        if(user){
            connectedUsers.push(user.name);
            res.status(200).json(connectedUsers);
        }else{
            res.status(400).send("Invalid username or password, please try again...");
        }
    });

    app.get('/user', (_,res) => {
        res.status(200).json(UserController.listUsers());
    })

}