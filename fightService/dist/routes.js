"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const fightController = __importStar(require("./fightController"));
const register = (app) => {
    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({ extended: true }));
    app.get('/', (_, res) => res.send('Hello world from fight service'));
    app.post('/toto', (_, res) => fightController.main());
    app.post('/pokemon', (req, res) => {
        const { id } = req.body;
        res.status(200).json(fightController.addPokemonFromPokeAPI(id));
    });
    app.get('/pokemon/:id', (req, res) => {
        const id = parseInt(req.params.id);
        res.status(200).json(fightController.getPokemon(id));
    });
    app.get('/pokemon', (req, res) => {
        res.status(200).json(fightController.getAllPokemons());
    });
    app.post('/fight', (req, res) => {
        const { id } = req.body;
        res.status(200).json(fightController.createFight(id));
    });
    app.get('/fight', (req, res) => {
        res.status(200).json(fightController.getAllFights());
    });
    app.put('/fight/pokemon', (req, res) => {
        const { fight, pokemon } = req.body;
        res.status(200).json(fightController.sendPokemonToArena(fight, pokemon));
    });
};
exports.register = register;
//# sourceMappingURL=routes.js.map