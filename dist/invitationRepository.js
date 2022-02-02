"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const fs_1 = __importDefault(require("fs"));
class InvitationRepository {
    constructor() {
        this.db = new better_sqlite3_1.default('db/invitation.db', { verbose: console.log });
        this.applyMigrations();
    }
    applyMigrations() {
        const applyMigration = (path) => {
            const migration = fs_1.default.readFileSync(path, 'utf8');
            this.db.exec(migration);
        };
        const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'invitation'").get();
        if (!testRow) {
            console.log('Applying migrations on DB invitation...');
            const migrations = ['db/migrations/init.sql'];
            migrations.forEach(applyMigration);
        }
    }
    getAllInvitations() {
        const statement = this.db.prepare('SELECT * FROM invitation');
        const rows = statement.all();
        return null;
    }
    createInvitation(sender, match) {
        const statement = this.db.prepare("INSERT INTO users (sender,match) VALUES (?,?)");
        return statement.run(sender, match).lastInsertRowid;
    }
}
exports.default = InvitationRepository;
//# sourceMappingURL=invitationRepository.js.map