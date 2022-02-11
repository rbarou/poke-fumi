import * as express from "express";

export const register = (app: express.Application) => {

    app.get('/',(_,res) =>{console.log("Hello from auth service !")});


}