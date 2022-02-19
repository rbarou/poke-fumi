import * as express from "express";
import fetch from 'cross-fetch';
import jwt from 'jsonwebtoken'

const path = require('path');
const dotenv = require('dotenv').config();

const userServiceURL : string = 'http://localhost:5000'

const jwt_secret = process.env.JWT_SECRET

export const register = (app: express.Application) => {

    app.get('/', (_,res) => {res.status(200).json("Hello from auth service !")});

    app.post('/auth/player/login', async (req,res) => {

        const connectRequest = path.join(userServiceURL,'user/connect');

        const user_request = await fetch(connectRequest, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
            body: JSON.stringify(req.body)
        });

        let user_result = await user_request.json();

        if(user_result){
            const accessToken = jwt.sign({name:user_result.name, role:'player'},jwt_secret)
            res.status(200).json(accessToken);
        }else{
            res.status(400).json("Username or password incorrect")
        }
    })
}