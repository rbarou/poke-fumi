import Database from 'better-sqlite3'
import fs from 'fs'
import {Pokemon, Fight, Type} from './model'

export default class FightRepository{
    db: Database.Database;

    constructor() {
        this.db = new Database('db/fight.db', { verbose: console.log });
        this.applyMigrations();
    }

    applyMigrations(){
        const applyMigration = (path: string) => {
            const migration = fs.readFileSync(path, 'utf8')
            this.db.exec(migration)
        }
        const isFightTableExists = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'fight'").get()
        const isPokemonTableExists = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name ='pokemon'").get()
        if (!isFightTableExists || !isPokemonTableExists){
            console.log('Applying migrations on DB fights...')
            const migrations = ['db/migrations/init.sql']
            migrations.forEach(applyMigration);
        }
    }

    getAllFights(){
        const statement = this.db.prepare("SELECT * FROM fight");
        const rows = statement.all();
        return rows;
    }

    
    getAllPokemons(){
        const statement = this.db.prepare("SELECT * FROM pokemon");
        const rows = statement.all();
        return rows;
    }

    getPokemon(id:number){
        const statement = this.db.prepare(`SELECT * FROM Pokemon AS p INNER JOIN Pokemon_Type AS pt ON p.pokemon_id = pt.pokemon_id INNER JOIN Type AS t ON pt.type_id = t.type_id WHERE pt.pokemon_id = ?`);
        const rows = statement.all(id);
        return rows;
    }

    addPokemon(pokemon_id : number, name : string){
        const statement = this.db.prepare("INSERT INTO pokemon (pokemon_id,name) VALUES (?,?)");
        statement.run(pokemon_id,name).lastInsertRowid;
    }

    addPokemonType = (pokemon_id : number, type_name : string, level_damage : string, target_type : string) => {
        const isTypeExists = this.db.prepare(`SELECT type_id FROM Type WHERE type_name = '${type_name}' AND target_type = '${target_type}'`).get();
        let statement, type_id;
        if(!isTypeExists){
            statement = this.db.prepare("INSERT INTO Type (type_name, level_damage, target_type) VALUES (?,?,?)")
            statement.run(type_name, level_damage, target_type)
            statement = this.db.prepare(`SELECT type_id FROM Type WHERE type_name = '${type_name}' AND target_type = '${target_type}'`).get();
            this.insertPokemonType(pokemon_id, statement.type_id);
        }
    }

    insertPokemonType = (pokemon_id : number, type_id : string) => {
        const statement = this.db.prepare("INSERT INTO Pokemon_Type(pokemon_id, type_id) VALUES (?,?)")
        statement.run(pokemon_id, type_id).changes;
    }


    createFight = (idMatch : number) => {
        const statement = this.db.prepare("INSERT INTO Fight (match_id) VALUES (?) ");
        return statement.run(idMatch).lastInsertRowid;
    }

    sendPokemonToArena = (idFight : number, idPokemon : number) => {
        let i = 1;
        const isFirst = this.db.prepare("SELECT * FROM Fight WHERE fight_id = " + idFight + " AND pokemon1 IS NULL").get();
        if(!isFirst){
            i = 2;
        }
        const statement = this.db.prepare("UPDATE Fight SET pokemon" + i + " = ? WHERE fight_id = ?" );
        statement.run(idPokemon, idFight).lastInsertRowid;
    }

    isFightStart = (idFight : number) => {
        return this.db.prepare("SELECT * FROM Fight WHERE fight_id = " + idFight + " AND pokemon1 IS NOT NULL AND pokemon2 IS NOT NULL").get();
    }

    getPokemonModel(id:number){
        const data = this.getPokemon(id);
        let type : Array<string> = []
        let no_damage_to : Array<string> = []
        let half_damage_to : Array<string> = []
        let double_damage_to : Array<string> = []

        for(let i = 0 ; i < data.length; i++){
            if(type.length == 0 || !type.includes(data[i].type)){
                type.push(data[i].type);
            }
            switch(data[i].level_damage){
                case "double" :
                    double_damage_to.push(data[i].target_type)
                    break;
                case "half" :
                    half_damage_to.push(data[i].target_type)
                    break;
                case "no" :
                    no_damage_to.push(data[i].target_type)
                    break;
                default:
            }
        }

        const model : Pokemon = {
            pokemon_id: id,
            name: data[0].name,
            type: type,
            no_damage_to : no_damage_to,
            half_damage_to : half_damage_to,
            double_damage_to : double_damage_to
        }
        return model
    }

    determineWinner(pokemon1: Pokemon, pokemon2: Pokemon) {
        let isPokemon1Winner = false;
        let isPokemon2Winner = false;

        for(let i = 0 ; i < pokemon2.type.length ; i++){
            if(pokemon1.double_damage_to.includes(pokemon2.type[i])){
                isPokemon1Winner = true;
                break;
            }  
        }

        for(let i = 0 ; i < pokemon1.type.length ; i++){
            if(pokemon2.double_damage_to.includes(pokemon2.type[i])){
                isPokemon2Winner = true;
                break;
            }  
        }
     
        if(isPokemon1Winner !== isPokemon2Winner){
            if(isPokemon1Winner) return pokemon1;
            return pokemon2;
        } else {
            isPokemon1Winner = false;
            isPokemon2Winner = false;
            for(let i = 0 ; i < pokemon2.type.length ; i++){
                if(pokemon1.half_damage_to.includes(pokemon2.type[i])){
                    isPokemon1Winner = true;
                    break;
                }  
            }
    
            for(let i = 0 ; i < pokemon1.type.length ; i++){
                if(pokemon2.half_damage_to.includes(pokemon1.type[i])){
                    isPokemon2Winner = true;
                    break;
                }  
            }
            
            if(isPokemon1Winner !== isPokemon2Winner){
                if(isPokemon1Winner) return pokemon1;
                return pokemon2;
            } else {
                isPokemon1Winner = false;
                isPokemon2Winner = false;
                for(let i = 0 ; i < pokemon2.type.length ; i++){
                    if(pokemon1.no_damage_to.includes(pokemon2.type[i])){
                        isPokemon2Winner = true;
                        break;
                    }  
                }
        
                for(let i = 0 ; i < pokemon1.type.length ; i++){
                    if(!pokemon2.no_damage_to.includes(pokemon2.type[i])){
                        isPokemon1Winner = true;
                        break;
                    }  
                } 
                
                if(isPokemon1Winner !== isPokemon2Winner){
                    if(isPokemon1Winner) return pokemon1;
                    return pokemon2;
                } else{
                    let i = Math.floor(Math.random() * (2 + 1));
                    if(i == 1){
                        return pokemon1;
                    }
                    return pokemon2;
                }
            }
        }          
    }

    getFight(id:number){
        const statement = this.db.prepare(`SELECT * FROM Fight WHERE fight_id = '${id}'`);
        const rows = statement.all();
        return rows;
    }

    getFightModel(id : number){
        const data = this.getFight(id);
        const pokemon1 = this.getPokemonModel(data[0].pokemon1);
        const pokemon2 = this.getPokemonModel(data[0].pokemon2);

        const model : Fight = {
            fight_id : id,
            match_id : data[0].match_id,
            pokemon1 : pokemon1,
            pokemon2 : pokemon2,
            winner : null 
        }

        return model
    }

}