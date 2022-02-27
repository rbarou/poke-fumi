import FightRepository from './fightRepository';
import fetch from 'cross-fetch';


const db: FightRepository = new FightRepository();

const addPokemonFromPokeAPI = (id : number) => {
    fetch('https://pokeapi.co/api/v2/pokemon-form/' + id)
    .then(res => {
        if (res.status >= 400) {
        throw new Error("Bad response from server");
        }
        return res.json();
    })
    .then(data => {
        console.log('Add new pokemon (id : ' + id + ', name : ' + data.name + ' , type : ' + data.types[0].type.name);
        db.addPokemon(id, data.name);

        for(let i = 0; i < data.types.length ; i++){
            addTypeFromPokeAPI(id,data.types[i].type.name);
            console.log('Add new pokemon (id : ' + id + ', name : ' + data.name + ' , type : ' + data.types[0].type.name);
        }
    });
}

const addTypeFromPokeAPI = (pokemon_id: number, name : string) => {
    fetch('https://pokeapi.co/api/v2/type/' + name)
    .then(res => {
        if (res.status >= 400) {
        throw new Error("Bad response from server");
        }
        return res.json();
    })
    .then(data => {
        console.log('Add new type ' + data.name);
        for(let i = 0; i < data.damage_relations.double_damage_to.length ; i++){
            db.addPokemonType(pokemon_id, name, "double", data.damage_relations.double_damage_to[i].name);
        }

        for(let i = 0; i < data.damage_relations.half_damage_to.length ; i++){
            db.addPokemonType(pokemon_id, name, "half", data.damage_relations.half_damage_to[i].name);
        }

        for(let i = 0; i < data.damage_relations.no_damage_to.length ; i++){
            db.addPokemonType(pokemon_id, name, "no", data.damage_relations.no_damage_to[i].name);
        }
    });
}

const getAllPokemons = () => {
    return db.getAllPokemons();
}

const getPokemon = (id:number) => {
    return db.getPokemon(id);
}

const getAllFights = () => {
    return db.getAllFights();
}

const createFight = (idMatch : number) => {
    db.createFight(idMatch);
}

const sendPokemonToArena = (idFight: number, idPokemon : number) => {
    let fightModel;
    let winner;
    db.sendPokemonToArena(idFight, idPokemon); 
    if(db.isFightStart(idFight)){
        fightModel = db.getFightModel(idFight);
        winner = db.determineWinner(fightModel.pokemon1, fightModel.pokemon2);
        console.log("LE GAGNANT EST " + winner.name);
    }

}

export {addPokemonFromPokeAPI, getAllPokemons, createFight, getAllFights, sendPokemonToArena, getPokemon};