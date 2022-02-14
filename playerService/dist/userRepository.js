"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const fs_1 = __importDefault(require("fs"));
class UserRepository {
    constructor() {
        this.db = new better_sqlite3_1.default('db/users.db', { verbose: console.log });
        this.applyMigrations();
    }
    applyMigrations() {
        const applyMigration = (path) => {
            const migration = fs_1.default.readFileSync(path, 'utf8');
            this.db.exec(migration);
        };
        const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'users'").get();
        if (!testRow) {
            console.log('Applying migrations on DB users...');
            const migrations = ['db/migrations/init.sql'];
            migrations.forEach(applyMigration);
        }
    }
    getAllUsers() {
        const statement = this.db.prepare("SELECT name, score FROM users");
        const rows = statement.all();
        return rows;
    }
    getUserByName(name) {
        const statement = this.db
            .prepare("SELECT user_id, name, score FROM users WHERE name = ?");
        const rows = statement.get(name);
        return rows;
    }
    getUserById(id) {
        const statement = this.db
            .prepare("SELECT user_id, name, score FROM users WHERE user_id = ?");
        const rows = statement.get(id);
        return rows;
    }
    createUser(name, password) {
        const statement = this.db.prepare("INSERT INTO users (name,password) VALUES (?,?)");
        return statement.run(name, password).lastInsertRowid;
    }
    removeUser(id) {
        const statement = this.db.prepare("DELETE FROM users WHERE user_id = ?");
        return statement.run(id).changes;
    }
    login(name, password) {
        const statement = this.db.prepare("SELECT * FROM users WHERE name = ? AND password = ?");
        return statement.all(name, password)[0];
    }
}
exports.default = UserRepository;
//# sourceMappingURL=userRepository.js.map