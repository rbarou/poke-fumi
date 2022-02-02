import {Request, Response, NextFunction} from 'express';
import jwt, { JwtPayload } from "jsonwebtoken"

export interface CustomUserRequest extends Request{
    user?: string | JwtPayload;
}

export const checkJWT = (req: CustomUserRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null){
        return res.send("no access");
    }
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}