"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePokemon = exports.addPokemonToDeck = exports.createDeck = exports.refuseInvitation = exports.acceptInvitation = exports.seeInvitations = exports.listMatchs = exports.createMatch = exports.getMatchDetails = void 0;
const matchRepository_1 = __importDefault(require("./matchRepository"));
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const dbMatchs = new matchRepository_1.default();
const listMatchs = () => {
    return dbMatchs.getAllMatchs();
};
exports.listMatchs = listMatchs;
const getMatchDetails = (match_id) => {
    return dbMatchs.getMatchDetails(match_id);
};
exports.getMatchDetails = getMatchDetails;
const createMatch = (user1_id, user2_id) => {
    return dbMatchs.createMatch(user1_id, user2_id);
};
exports.createMatch = createMatch;
const createMatchEmpty = (user1_id) => {
    return dbMatchs.createMatchEmpty(user1_id);
};
const seeInvitations = (user1_id) => {
    return dbMatchs.seeInvitations(user1_id);
};
exports.seeInvitations = seeInvitations;
const acceptInvitation = (user1_id, user2_id, match_id) => {
    return dbMatchs.acceptInvitation(user1_id, user2_id, match_id);
};
exports.acceptInvitation = acceptInvitation;
const refuseInvitation = (user1_id, user2_id, match_id) => {
    return dbMatchs.refuseInvitation(user1_id, user2_id, match_id);
};
exports.refuseInvitation = refuseInvitation;
const createDeck = (user_id, match_id) => {
    return dbMatchs.createDeck(user_id, match_id);
};
exports.createDeck = createDeck;
const addPokemonToDeck = (user_id, match_id, pokemon_id) => {
    //recup pokemon à partir de l'api externe
    addPokemonFromPokeAPI(pokemon_id);
    //on ajoute le pokemon dans la table Pokemon
    // on relie un pokemon à un deck via la table intermédiaire
    return dbMatchs.addPokemonToDeck(user_id, match_id, pokemon_id);
};
exports.addPokemonToDeck = addPokemonToDeck;
const removePokemon = (user_id, match_id, pokemon_id) => {
    return dbMatchs.removePokemon(user_id, match_id, pokemon_id);
};
exports.removePokemon = removePokemon;
const removeMatch = (match_id) => {
    return dbMatchs.removeMatch(match_id);
};
const editMatch = (match_id, status) => {
    return dbMatchs.editMatch(match_id, status);
};
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
        dbMatchs.createPokemon(id, data.name);
    });
};
//# sourceMappingURL=matchController.js.map