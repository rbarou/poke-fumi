import * as express from "express"
import * as UserController from "./userController"
import * as InvitationController from './invitationController'
import * as MatchController from './matchController'
import { User, Match, Invitation } from './model'
import { checkJWT } from "./authenticateJWT"
import jwt from "jsonwebtoken"

require("dotenv").config();

export const register = ( app: express.Application ) => {

  let connectedUsers : string[] = []

  const checkLogin = (req:express.Request, res:express.Response ,next:express.NextFunction) => {
    const user = req.headers["authorization"];
    if(!connectedUsers.includes(user)){
      return res.send("Need authentificaiton.")
    }else{
      next(); 
    }
  }

  app.get('/',(_, res) => res.send('Hello World!'));

  app.put('/user/register', (req, res) => {
    const newUser: User = req.body
    const userName = UserController.findByName(newUser.name);
    if(userName){
      res.status(400).json("This username is already taken");
    }else{
      res.status(200).json(UserController.addUser(newUser.name,newUser.password))
    }
  })

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

  app.get('/user', checkLogin, (_, res) => {
    res.status(200).json(UserController.listUsers())
  })
 
  // Match
  app.put('/match/add', (req, res) => {
    const newMatch: Match = req.body
    res.status(200).json(MatchController.addMatch(newMatch.name,newMatch.user1.user_id, newMatch.user2.user_id))
  });

  app.get('/matches', (req, res) => {
    res.status(200).json(MatchController.listMatches())
  });

  //Invitation HTTP Request
  app.get('/invitation', (req,res) => {
    res.status(200).json(InvitationController.listInvitations())
  })

 app.put('/invitation/add', (req, res) => {
    const newInvitation: Invitation = req.body
    res.status(200).json(InvitationController.addInvitation(newInvitation.sender.user_id,newInvitation.match.match_id))
  });
}
 