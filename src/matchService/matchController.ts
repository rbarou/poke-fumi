import { Match, User } from '../model/model'
import MatchRepository from './matchRepository'

const dbMatches: MatchRepository = new MatchRepository();

const listMatches = () => {
   return dbMatches.getAllMatches()
}
  
const addMatch = (name: string, user1: number, user2: number) => {
   dbMatches.createMatch(name, user1, user2);
   return dbMatches.getAllMatches()
}
  
export { listMatches, addMatch }
