CREATE TABLE IF NOT EXISTS Fight (
  fight_id INTEGER PRIMARY KEY AUTOINCREMENT,
  match_id INTEGER DEFAULT 1 ,
  pokemon1 INTEGER,
  pokemon2 INTEGER,
  winner  INTEGER,

  FOREIGN KEY(pokemon1) REFERENCES pokemon(pokemon_id),
  FOREIGN KEY(pokemon2) REFERENCES pokemon(pokemon_id)
);

CREATE TABLE IF NOT EXISTS Pokemon (
  pokemon_id INTEGER PRIMARY KEY ,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Pokemon_Type(
  pokemon_id INTEGER NOT NULL,
  type_id INTEGER NOT NULL,
  CONSTRAINT PK PRIMARY KEY (pokemon_id,type_id)
);

CREATE TABLE IF NOT EXISTS Type (
  type_id INTEGER PRIMARY KEY AUTOINCREMENT,
  type_name TEXT NOT NULL,
  level_damage TEXT NOT NULL, 
  target_type TEXT NOT NULL
);

