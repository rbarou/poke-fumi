import Database from 'better-sqlite3'
import fs from 'fs'

export default class MatchRepository{

    db: Database.Database;

    constructor(){
        this.db = new Database('db/matchs.db',{verbose: console.log});
        this.applyMigrations();
    }

    applyMigrations(){
        const applyMigration = (path: string) => {
            const migration = fs.readFileSync(path, 'utf8')
            this.db.exec(migration)
        }
        const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'users'").get()
        if (!testRow){
            console.log('Applying migrations on DB users...')
            const migrations = ['db/migrations/init.sql']      
            migrations.forEach(applyMigration)
        }
    }

    getAllMatchs(){
        const statement = this.db.prepare("SELECT match_id, name, state FROM match");
        return statement.all();
    }

    createMatch(inviter : string, name : string, invitee : string){
        const statement = this.db.prepare(
            "INSERT INTO match (name,user1,user2,state) VALUES (?,?,?,'requested')"
        )
        return statement.run(name,inviter,invitee);
    }

    getInvites(user_id : string){
        const statement = this.db
            .prepare("SELECT name FROM match WHERE user2 = ? AND state = 'requested'");
        return statement.get(user_id);
    }

}