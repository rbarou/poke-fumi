import MatchRepository from "./matchRepository";

const dbMatchs: MatchRepository = new MatchRepository();

const listMatchs = () => {
    return dbMatchs.getAllMatchs();
}

const checkInvites = (user_id : string) => {
    return dbMatchs.getInvites(user_id);
}

const createMatch = (inviter : string, name : string, invitee : string) => {
    return dbMatchs.createMatch(inviter, name, invitee);
}

export {listMatchs, checkInvites, createMatch};