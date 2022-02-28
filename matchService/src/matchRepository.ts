import Database from 'better-sqlite3'
import fs from 'fs'
import {Match} from './model'

export default class MatchRepository{

    db: Database.Database;

    constructor() {
        this.db = new Database('db/matchs.db', { verbose: console.log });
        this.applyMigrations();
    }

    applyMigrations(){
        const applyMigration = (path: string) => {
            const migration = fs.readFileSync(path, 'utf8')
            this.db.exec(migration)
        }
        const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'matchs'").get()
        if (!testRow){
            console.log('Applying migrations on DB users...')
            const migrations = ['db/migrations/init.sql']      
            migrations.forEach(applyMigration)
        }
    }

    getAllMatchs(){
        const statement = this.db.prepare("SELECT name FROM matchs");
        const rows = statement.all();
        return rows;
    }

    getMatchDetails(match_id : number){
        const statement = this.db
            .prepare("SELECT matchs.status, matchs.name, users.name, FROM matchs, users, fights WHERE match_id = ? AND (matchs.user1_id = users.user_id OR matchs.user2_id = users.user_id) GROUP BY matchs.name");
        const rows : Match[] = statement.get(match_id);
        return rows; 
    }

    createMatch(user1_id : number, user2_id : number){
        const statement = 
            this.db.prepare("INSERT INTO matchs (user1_id, user2_id, status) VALUES (?, ?, 'created')");
        return statement.run(user1_id,user2_id).lastInsertRowid;
    }

    seeInvitations(user1_id: number){
        const statement = this.db
            .prepare("SELECT name FROM matchs WHERE (user1_id = ? OR user2_id = null) AND status = 'created'");
        const rows : Match[] = statement.all(user1_id);
        return rows;
    }

    acceptInvitation(user1_id: number, user2_id: number){
        const statement = this.db
            .prepare("UPDATE matchs SET status = 'playing' WHERE user1_id = ? AND user2_id = ? AND status = 'created' GROUP BY user1_id, user2_id HAVING COUNT(*) < 3");
        return statement.run(user1_id,user2_id);
    }

    refuseInvitation(user1_id: number, user2_id: number){
        const statement = this.db
            .prepare("DELETE FROM matchs WHERE user1_id = ? AND user2_id = ? AND status = 'created'");
        return statement.run(user1_id,user2_id);
    }

    createDeck(user_id: number, match_id: number, pokemon_names: Array<string>){
        const statement = this.db
            .prepare("INSERT INTO decks (user_id, match_id, pokemon_names) VALUES (?, ?, ?)");
        return statement.run(user_id, match_id, pokemon_names);
    }

    getDeck(user_id: number, match_id: number){
        const statement = this.db
            .prepare("SELECT pokemon_names FROM decks WHERE deck.user_id = ? AND deck.match_id = ?");
        const rows : Array<string> = statement.all(user_id, match_id);
        return rows;
    }

    addPokemon(user_id: number, match_id: number, pokemon_name: string){
        const pokemon_names = this.getDeck(user_id, match_id);
        if (pokemon_names.length < 10) {
            pokemon_names.push(pokemon_name);
            const statement = this.db
                .prepare("UPDATE decks SET pokemon_names = ? WHERE user_id = ? AND match_id = ?");
            return statement.run(user_id, match_id, pokemon_names);
        }
        return pokemon_names;
    }

    removePokemon(user_id: number, match_id: number, pokemon_name: string){
        const pokemon_names = this.getDeck(user_id, match_id);
        if (pokemon_names.length == 0) {
            const index = pokemon_names.indexOf(pokemon_name);
            if (index > -1) {   
                pokemon_names.splice(index, 1);
                const statement = this.db
                    .prepare("UPDATE decks SET pokemon_names = ? WHERE user_id = ? AND match_id = ?");
                return statement.run(user_id, match_id, pokemon_names);
            }
        }
        return pokemon_names;
    }
}
