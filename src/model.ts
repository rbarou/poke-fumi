export interface User{
    user_id: number;
    name: string;
    score: number;
    password: string;
    token: string;
}

export interface Pokemon{
    
}

export interface Match{
    match_id: number
    name : string;
    user1 : User;
    // deck1 : Pokemon[];
    user2 : User;
    // deck2 : Pokemon[];
}

export interface Invitation {
    invit_id: number;
    sender: User;
    match:  Match;
}


