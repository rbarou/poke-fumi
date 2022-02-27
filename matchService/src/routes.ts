import * as express from "express";

export const register = (app: express.Application) => {
    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get("/", (req,res) => {
        res.status(200).send("Hello from match service ! ");
    })

    app.get("match/", (req,res) => {
        res.status(200).json(MatchControler)
    })

}