import MatchRepository from './matchRepository';

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

const seeInvitations = (user1_id: number) => {
    return dbMatchs.seeInvitations(user1_id);
}

const acceptInvitation = (user1_id: number, user2_id: number) => {
    return dbMatchs.acceptInvitation(user1_id, user2_id);
}

const refuseInvitation = (user1_id: number, user2_id: number) => {
    return dbMatchs.refuseInvitation(user1_id, user2_id);
}

const createDeck = (user_id: number, match_id: number, pokemon_names: Array<string>) => {
    return dbMatchs.createDeck(user_id, match_id, pokemon_names);
}

const addPokemon = (user_id: number, match_id: number, pokemon_name: string) => {
    return dbMatchs.addPokemon(user_id, match_id, pokemon_name);
}

const removePokemon = (user_id: number, match_id: number, pokemon_name: string) => {
    return dbMatchs.removePokemon(user_id, match_id, pokemon_name);
}



export {getMatchDetails, createMatch, listMatchs, seeInvitations, acceptInvitation, refuseInvitation, createDeck, addPokemon, removePokemon};