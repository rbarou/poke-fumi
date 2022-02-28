import * as express from "express";
import {Match} from "./model";
import * as MatchController from './matchController';

export const register = (app: express.Application) => {

    app.get('/',(_,res) => res.send('Hello world from match service'));

}