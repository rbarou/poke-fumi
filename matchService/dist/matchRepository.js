"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const fs_1 = __importDefault(require("fs"));
class MatchRepository {
    constructor() {
        this.db = new better_sqlite3_1.default('db/matchs.db', { verbose: console.log });
        this.applyMigrations();
    }
    applyMigrations() {
        const applyMigration = (path) => {
            const migration = fs_1.default.readFileSync(path, 'utf8');
            this.db.exec(migration);
        };
        const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'matchs'").get();
        console.log(testRow);
        if (!testRow) {
            console.log('Applying migrations on DB users...');
            const migrations = ['db/migrations/init.sql'];
            migrations.forEach(applyMigration);
        }
    }
    getAllMatchs() {
        const statement = this.db.prepare("SELECT * FROM matchs");
        return statement.all();
    }
    getMatchDetails(match_id) {
        const statement = this.db
            .prepare("SELECT status, user1_id, user2_id, match_id FROM matchs WHERE match_id = ?");
        const rows = statement.get(match_id);
        return rows;
    }
    createMatch(user1_id, user2_id) {
        const statement = this.db.prepare("INSERT INTO matchs (user1_id, user2_id, status) VALUES (?, ?, 'created')");
        return statement.run(user1_id, user2_id).lastInsertRowid;
    }
    createMatchEmpty(user1_id) {
        const statement = this.db.prepare("INSERT INTO matchs (user1_id, status) VALUES (?, 'created')");
        return statement.run(user1_id).lastInsertRowid;
    }
    seeInvitations(user1_id) {
        const statement = this.db
            .prepare("SELECT match_id FROM matchs WHERE (user1_id = ? OR user2_id = null) AND status = 'created'");
        const rows = statement.all(user1_id);
        return rows;
    }
    acceptInvitation(user1_id, user2_id, match_id) {
        const statement1 = this.db.prepare("SELECT user1_id, user2_id FROM matchs WHERE user1_id = ? AND user2_id = ? AND match_id = ? AND status = 'created' GROUP BY user2_id HAVING COUNT(*) < 3");
        const statement2 = this.db.prepare("SELECT user1_id, user2_id FROM matchs WHERE user1_id = ? AND user2_id = ? AND match_id = ? AND status = 'created' GROUP BY user1_id HAVING COUNT(*) < 3");
        const rows = statement1.all(user1_id, user2_id, match_id);
        const rows2 = statement2.all(user1_id, user2_id, match_id);
        console.log(rows);
        if (rows != [] && rows2 != []) {
            console.log("Pas null");
            const statement = this.db
                .prepare("UPDATE matchs SET status = 'accepted' WHERE user1_id = ? AND user2_id = ? AND match_id = ? AND status = 'created'");
            return statement.run(user1_id, user2_id, match_id);
        }
    }
    refuseInvitation(user1_id, user2_id, match_id) {
        const statement = this.db
            .prepare("DELETE FROM matchs WHERE user1_id = ? AND user2_id = ? AND match_id = ? AND status = 'created'");
        return statement.run(user1_id, user2_id, match_id);
    }
    createDeck(user_id, match_id) {
        const statement = this.db
            .prepare("INSERT INTO decks (user_id, match_id) VALUES (?, ?, ?)");
        return statement.run(user_id, match_id);
    }
    getDeckID(user_id, match_id) {
        const statement = this.db
            .prepare("SELECT deck_id FROM decks WHERE user_id = ? AND match_id = ?");
        return statement.all(user_id, match_id);
    }
    createPokemon(pokemon_id, name) {
        const statement = this.db.prepare("INSERT INTO pokemon (pokemon_id,name) VALUES (?,?)");
        return statement.run(pokemon_id, name).lastInsertRowid;
    }
    addPokemonToDeck(user_id, match_id, pokemon_id) {
        const deck_id = this.getDeckID(user_id, match_id);
        const deckLength = this.getDeckLength(user_id, match_id);
        if (deckLength < 10) {
            const statement = this.db
                .prepare("INSERT INTO deck_Pokemon (deck_id, pokemon_id) VALUES (?,?)");
            return statement.run(deck_id, pokemon_id).lastInsertRowid;
        }
    }
    getDeckLength(user_id, match_id) {
        const statement = this.db.prepare("SELECT COUNT(pokemon_id) FROM decks AS d INNER JOIN deck_Pokemon as dp ON d.deck_id = dp.deck_id WHERE user_id = ? AND match_id = ? ");
        return statement.get().all(user_id, match_id);
    }
    removePokemon(user_id, match_id, pokemon_id) {
        const deck_id = this.getDeckID(user_id, match_id);
        const deckLength = this.getDeckLength(user_id, match_id);
        if (deckLength > 0) {
            const statement = this.db
                .prepare("DELETE FROM deck_Pokemon WHERE deck_id = ? AND pokemon_id = ?");
            return statement.run(deck_id, pokemon_id).lastInsertRowid;
        }
    }
    removeMatch(match_id) {
        const statement = this.db
            .prepare("DELETE FROM matchs WHERE match_id = ?");
        return statement.run(match_id);
    }
    editMatch(match_id, status) {
        const statement = this.db
            .prepare("UPDATE matchs SET status = ? WHERE match_id = ?");
        return statement.run(status, match_id);
    }
}
exports.default = MatchRepository;
//# sourceMappingURL=matchRepository.js.map