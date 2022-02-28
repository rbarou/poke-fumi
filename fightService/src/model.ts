export interface Pokemon{
    pokemon_id: number;
    name: string;
    type: Array<string>;
    no_damage_to : Array<string>;
    half_damage_to : Array<string>;
    double_damage_to : Array<string>;
}

export interface Fight{
    fight_id : number
    match_id : number,
    pokemon1 : Pokemon,
    pokemon2 : Pokemon,
    winner  : Pokemon,
}

export interface Type{
    type_id: number;
    type_name : string;
    no_damage_to : Array<string>;
    half_damage_to : Array<string>;
    double_damage_to : Array<string>;
}