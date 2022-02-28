import MatchRepository from './matchRepository';
import fetch from 'cross-fetch';

const dbMatchs: MatchRepository = new MatchRepository();

const listMatchs = () => {
    return dbMatchs.getAllMatchs();
}

const getMatchDetails = (match_id: number) => {
    return dbMatchs.getMatchDetails(match_id);
}

const createMatch = (user1_id: number, user2_id: number) => {
    return dbMatchs.createMatch(user1_id, user2_id);
}

const createMatchEmpty = (user1_id: number) => {
    return dbMatchs.createMatchEmpty(user1_id);
}

const seeInvitations = (user1_id: number) => {
    return dbMatchs.seeInvitations(user1_id);
}

const acceptInvitation = (user1_id: number, user2_id: number, match_id: number) => {
    return dbMatchs.acceptInvitation(user1_id, user2_id, match_id);
}

const refuseInvitation = (user1_id: number, user2_id: number, match_id: number) => {
    return dbMatchs.refuseInvitation(user1_id, user2_id, match_id);
}

const createDeck = (user_id: number, match_id: number) => {
    return dbMatchs.createDeck(user_id, match_id);
}

const addPokemonToDeck = (user_id: number, match_id: number, pokemon_id: number) => {
    //recup pokemon à partir de l'api externe
    addPokemonFromPokeAPI(pokemon_id)
    //on ajoute le pokemon dans la table Pokemon
    // on relie un pokemon à un deck via la table intermédiaire

    return dbMatchs.addPokemonToDeck(user_id, match_id, pokemon_id);
}

const removePokemon = (user_id: number, match_id: number, pokemon_id: number) => {
    return dbMatchs.removePokemon(user_id, match_id, pokemon_id);
}

const removeMatch = (match_id: number) => {
    return dbMatchs.removeMatch(match_id);
}

const editMatch = (match_id: number, status?: string,) => {
    return dbMatchs.editMatch(match_id, status);
}


const addPokemonFromPokeAPI = (id: number) => {
    fetch('https://pokeapi.co/api/v2/pokemon-form/' + id)
    .then(res => {
        if (res.status >= 400) {
        throw new Error("Bad response from server");
        }
        return res.json();
    })
    .then(data => {
        console.log('Add new pokemon (id : ' + id + ', name : ' + data.name + ' , type : ' + data.types[0].type.name);
        dbMatchs.createPokemon(id, data.name);
    });
}

export {getMatchDetails, createMatch, listMatchs, seeInvitations, acceptInvitation, refuseInvitation, createDeck, addPokemonToDeck, removePokemon};