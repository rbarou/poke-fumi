CREATE TABLE IF NOT EXISTS matchs (
  match_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  status TEXT NOT NULL,
  user1_id INTEGER,
  user2_id INTEGER,
  winner_id INTEGER,
  deck_id INTEGER,
  CONSTRAINT fk_user
    FOREIGN KEY (user1_id, user2_id, winner_id)
    REFERENCES users(user_id, user_id, user_id)
);

CREATE TABLE IF NOT EXISTS decks(
  deck_id INTEGER PRIMARY KEY AUTOINCREMENT,
  pokemon_names ARRAY<TEXT>,
  user_id: INTEGER NOT NULL,
  match_id: INTEGER NOT NULL,
  CONSTRAINT fk_match
    FOREIGN KEY (match_id)
    REFERENCES matchs(match_id)
  CONSTRAINT fk_user
    FOREIGN KEY (user_id)
    REFERENCES users(user_id)
);
