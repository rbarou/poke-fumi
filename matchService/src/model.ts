export interface Match{
    match_id: number;
    name: string;
    user1_id: number;
    user2_id: number;
    winner_id: number;
    status: string;
    deck_id: number;
}

export interface Deck{
    deck_id: number;
    pokemon_names: Array<string>;
    user_id: number;
    match_id: number;
}

