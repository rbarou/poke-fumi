

CREATE TABLE IF NOT EXISTS matchs (
  match_id INTEGER PRIMARY KEY AUTOINCREMENT,
  status TEXT NOT NULL,
  user1_id INTEGER,
  user2_id INTEGER,
  deck_id INTEGER
);

CREATE TABLE IF NOT EXISTS decks(
  deck_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  match_id INTEGER,
  FOREIGN KEY (match_id) REFERENCES matchs(match_id)
);

CREATE TABLE IF NOT EXISTS deck_Pokemon(
  deck_id INTEGER PRIMARY KEY AUTOINCREMENT,
  pokemon_id INTEGER,
  FOREIGN KEY (pokemon_id) REFERENCES pokemons(pokemon_id)
);

CREATE TABLE IF NOT EXISTS Pokemon (
  pokemon_id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);