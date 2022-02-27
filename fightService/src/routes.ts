import * as express from "express";
import * as fightController from"./fightController";


export const register = (app: express.Application) => {
    
    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/', (_,res) => res.send('Hello world from fight service'));

    app.post('/pokemon', (req,res) => {
        const {id} = req.body;
        res.status(200).json(fightController.addPokemonFromPokeAPI(id));
    })
    app.get('/pokemon/:id', (req,res) => {
        const id = parseInt(req.params.id)
        res.status(200).json(fightController.getPokemon(id));
    })

    app.get('/pokemon', (req,res) => {
        res.status(200).json(fightController.getAllPokemons());
    })
    
    app.post('/fight', (req,res) => {
        const {id} = req.body;
        res.status(200).json(fightController.createFight(id));
    })

    app.get('/fight', (req,res) => {
        res.status(200).json(fightController.getAllFights());
    })

    app.put('/fight/pokemon', (req,res) => {
        const {fight, pokemon} = req.body;
        res.status(200).json(fightController.sendPokemonToArena(fight,pokemon));
    }) 
}