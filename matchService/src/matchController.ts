import MatchRepository from "./matchRepository";

const dbMatchs: MatchRepository = new MatchRepository();

const listMatchs = () => {
    return dbMatchs.getAllMatchs();
}

export {listMatchs};