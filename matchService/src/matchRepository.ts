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
        
    }

}