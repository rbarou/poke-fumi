import * as express from "express";
import {Match} from "./model";
import * as MatchController from './matchController';
import fetch from 'cross-fetch';

const path = require('path');

const userServiceURL : string = 'http://localhost:5000';

export const register = (app: express.Application) => {

    app.get('/',(_,res) => res.send('Hello world from match service'));

    app.get('/match/getAllMatchs', (req,res) => {
        res.status(200).json(MatchController.listMatchs());
    });

    app.get('/match/getMatch', (req,res) => {
        const match_id : number = +req.body.match_id;
        if(match_id){
            res.status(200).json(MatchController.getMatchDetails(match_id));
        }else{
            res.status(400).json("Please specify a match id");
        }
    })

    app.put('/match/invite', async (req,response) => {

        const userRequest = 'http://localhost:5000/user/getUserById?id=1';

        const user1_id : number = +req.body.host;
        const user2_id : number = +req.body.guest;

        fetch(userRequest)
        .then( res => {
            if (res.status >= 400) {
                throw new Error("Bad response from server");
                }
                return res.json;
        })
        .then( user => {
            if(user){
                response.json(MatchController.createMatch(user1_id,user2_id));
            }else{
                response.status(400).json("Guest doesn't exist");
            }}
        )
    });

    app.get('/match/getInvites', async(req,res) => {
        const userID : number = +req.body.userID;
        res.status(200).json(MatchController.seeInvitations(userID));
    });

    app.put('/match/accept', async(req,res) => {
        const guestID : number = +req.body.guestID;
        const matchID : number = +req.body.matchID;
        const hostID : number = +req.body.hostID;
        if(matchID && hostID){
            res.status(200).json(MatchController.acceptInvitation(guestID,hostID,matchID));
        }else{
            res.status(400).json("Please specify a match ID and an inviter ID");
        }
    });

    app.post('/match/deck', async(req,res) => {
        const userID : number = +req.headers.userID;
        const matchID : number = +req.body.matchID;
        if (matchID){
            res.status(200).json(MatchController.createDeck(userID,matchID));
        }else{
            res.status(400).json("Please specify a match ID");
        }
    });

    app.post('/match/deck/pokemon', async(req,res) => {
        const userID : number = +req.headers.userID;
        const matchID : number = +req.body.matchID;
        const pokemonID : number = +req.body.pokemonID;
        if (matchID && pokemonID){
            res.status(200).json(MatchController.addPokemonToDeck(userID,matchID,pokemonID));
        }else{
            res.status(400).json("Please specify a match ID and a pokemon ID");
        }
        
    });


    //app.put('/match/deck/')
}