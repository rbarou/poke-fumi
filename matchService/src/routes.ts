import * as express from "express";
import {Match} from './model';
import * as MatchControler from './matchController';

export const register = (app: express.Application) => {
    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get("/", (req,res) => {
        res.status(200).send("Hello from match service ! ");
    })

    app.get("match/getAllMatchs", (req,res) => {
        res.status(200).json(MatchControler.listMatchs)
    })

    app.post("match/invite", (req,res) => {
        const inviter = req.headers.user_id as string;
        const {name,invitee} = req.body;
        res.status(200).json(MatchControler.createMatch(inviter,name,invitee));
    })

    app.get("match/checkInvites", (req,res) => {
        const user_id = req.headers.user_id as string;
        res.status(200).json(MatchControler.checkInvites(user_id));
    })

}