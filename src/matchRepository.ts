import Database from 'better-sqlite3';
import { Match, User } from "./model";
import fs from 'fs';

export default class MatchRepository {
  db: Database.Database;

  constructor() {
    this.db = new Database('db/match.db', { verbose: console.log });
    this.applyMigrations()    
  }

  applyMigrations(){
    const applyMigration = (path: string) => {
      const migration = fs.readFileSync(path, 'utf8')
      this.db.exec(migration)
    }
    
    const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'match'").get()

    if (!testRow){
      console.log('Applying migrations on DB match...')
      const migrations = ['db/migrations/init.sql']      
      migrations.forEach(applyMigration)
    }
  }

  getAllMatches(): (Partial<Match>)[] {
    const statement = this.db.prepare("SELECT * FROM match")
    const rows = statement.all().map(match => ({"name":match.name}));
    return rows
  }

  getMatch(name: string): Match {
    const statement = this.db.prepare("SELECT * FROM match WHERE name = ?")
    const row = statement.get(name);
    return row
  }

  createMatch(name: string, user1: number, user2: number) {
    const statement = this.db.prepare("INSERT INTO match (name, user1, user2) VALUES (?,?,?)")
    return statement.run(name, user1, user2).lastInsertRowid
  }
}