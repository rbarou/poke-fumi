"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPokemon = exports.sendPokemonToArena = exports.getAllFights = exports.createFight = exports.getAllPokemons = exports.main = exports.addPokemonFromPokeAPI = void 0;
const fightRepository_1 = __importDefault(require("./fightRepository"));
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const db = new fightRepository_1.default();
const addPokemonFromPokeAPI = (id) => {
    (0, cross_fetch_1.default)('https://pokeapi.co/api/v2/pokemon-form/' + id)
        .then(res => {
        if (res.status >= 400) {
            throw new Error("Bad response from server");
        }
        return res.json();
    })
        .then(data => {
        console.log('Add new pokemon (id : ' + id + ', name : ' + data.name + ' , type : ' + data.types[0].type.name);
        db.addPokemon(id, data.name);
        for (let i = 0; i < data.types.length; i++) {
            addTypeFromPokeAPI(id, data.types[i].type.name);
            console.log('Add new pokemon (id : ' + id + ', name : ' + data.name + ' , type : ' + data.types[0].type.name);
        }
    });
};
exports.addPokemonFromPokeAPI = addPokemonFromPokeAPI;
const addTypeFromPokeAPI = (pokemon_id, name) => {
    (0, cross_fetch_1.default)('https://pokeapi.co/api/v2/type/' + name)
        .then(res => {
        if (res.status >= 400) {
            throw new Error("Bad response from server");
        }
        return res.json();
    })
        .then(data => {
        console.log('Add new type ' + data.name);
        for (let i = 0; i < data.damage_relations.double_damage_to.length; i++) {
            db.addPokemonType(pokemon_id, name, "double", data.damage_relations.double_damage_to[i].name);
        }
        for (let i = 0; i < data.damage_relations.half_damage_to.length; i++) {
            db.addPokemonType(pokemon_id, name, "half", data.damage_relations.half_damage_to[i].name);
        }
        for (let i = 0; i < data.damage_relations.no_damage_to.length; i++) {
            db.addPokemonType(pokemon_id, name, "no", data.damage_relations.no_damage_to[i].name);
        }
    });
};
const getAllPokemons = () => {
    return db.getAllPokemons();
};
exports.getAllPokemons = getAllPokemons;
const getPokemon = (id) => {
    return db.getPokemon(id);
};
exports.getPokemon = getPokemon;
const getAllFights = () => {
    return db.getAllFights();
};
exports.getAllFights = getAllFights;
const main = () => {
    const pokemonsUrl = 'https://pokeapi.co/api/v2/pokemon-form/1';
    (0, cross_fetch_1.default)(pokemonsUrl)
        .then(res => {
        if (res.status >= 400) {
            throw new Error("Bad response from server");
        }
        return res.json();
    })
        .then(data => {
        console.log(data.name);
    });
};
exports.main = main;
const createFight = (idMatch) => {
    db.createFight(idMatch);
};
exports.createFight = createFight;
const sendPokemonToArena = (idFight, idPokemon) => {
    let fightModel;
    let winner;
    db.sendPokemonToArena(idFight, idPokemon);
    if (db.isFightStart(idFight)) {
        fightModel = db.getFightModel(idFight);
        winner = db.determineWinner(fightModel.pokemon1, fightModel.pokemon2);
        console.log("LE GAGNANT EST " + winner.name);
    }
};
exports.sendPokemonToArena = sendPokemonToArena;
//# sourceMappingURL=fightController.js.map