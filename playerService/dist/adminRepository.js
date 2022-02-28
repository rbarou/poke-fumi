"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const fs_1 = __importDefault(require("fs"));
class AdminRepository {
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
    removeUser(id) {
        const statement = this.db
            .prepare("DELETE FROM users WHERE user_id = ?");
        return statement.run(id).changes;
    }
    updateUser(id, name, password) {
        const statement = this.db.prepare("UPDATE users SET name = ?, password = ? WHERE user_id = ?");
        return statement.run(name, password, id).changes;
    }
}
exports.default = AdminRepository;
//# sourceMappingURL=adminRepository.js.map