export interface Match{
    match_id: number;
    user1_id: number;
    user2_id: number;
    status: string;
}

export interface Deck{
    deck_id: number;
    user_id: number;
    match_id: number;
}

export interface DeckPokemon{
    deck_id: number;
    pokemon_id: number;
}

export interface Pokemon{
    pokemon_id: number;
    name: string;
}
