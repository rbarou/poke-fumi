import * as express from "express";
import jwt from 'jsonwebtoken'
const dotenv = require('dotenv').config();

export const authenticateJWT = (req : express.Request,res : express.Response, next : express.NextFunction) => {

    const token = req.header('auth-token');

    if(!token){
        return res.status(401).send("Acces Denied!");
    }
    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.body.user = verified;
        next();
    }catch(err){
        res.status(400).send('Invalid token...');
    }
}