import Database from 'better-sqlite3'
import fs from 'fs'
import {Invitation} from './model'
import bcrpyt from 'bcrypt';

export default class InvitationRepository {
  db: Database.Database

  constructor() {
    this.db = new Database('db/invitation.db', { verbose: console.log });
    this.applyMigrations()    
  }

  applyMigrations(){
    const applyMigration = (path: string) => {
      const migration = fs.readFileSync(path, 'utf8')
      this.db.exec(migration)
    }
    
    const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'invitation'").get()

    if (!testRow){
      console.log('Applying migrations on DB invitation...')
      const migrations = ['db/migrations/init.sql']      
      migrations.forEach(applyMigration)
    }
  }

  getAllInvitations(): Invitation[] {
      const statement = this.db.prepare('SELECT * FROM invitation')
      const rows = statement.all()
      return null
  }

  createInvitation(sender:number, match: number){
    const statement = 
      this.db.prepare("INSERT INTO users (sender,match) VALUES (?,?)")
    return statement.run(sender,match).lastInsertRowid
  }

}