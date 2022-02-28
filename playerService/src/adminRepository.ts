import Database from 'better-sqlite3'
import fs from 'fs'

export default class AdminRepository{
    db: Database.Database;

    constructor(){
        this.db = new Database('db/users.db',{ verbose: console.log });
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

    removeUser(id : string){
        const statement = this.db
            .prepare("DELETE FROM users WHERE user_id = ?");
        return statement.run(id).changes;
    }

    updateUser( id : string, name:string, password : string){
        const statement = this.db.prepare("UPDATE users SET name = ?, password = ? WHERE user_id = ?");
        return statement.run(name, password, id).changes;
    }
}