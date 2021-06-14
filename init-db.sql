CREATE TABLE IF NOT EXISTS user_account (
    user_id serial PRIMARY KEY,
    firebase_uuid uuid NOT NULL,
    email VARCHAR ( 255 ) UNIQUE NOT NULL,
    created_on TIMESTAMP NOT NULL,
    last_login TIMESTAMP
);

CREATE TABLE IF NOT EXISTS league (
    league_id serial PRIMARY KEY,
    league_name VARCHAR ( 255 ),
    commissioner_user_id int NOT NULL references user_account
);

CREATE TABLE IF NOT EXISTS team (
    team_id serial PRIMARY KEY,
    user_id int NOT NULL REFERENCES user_account,
    league_id int NOT NULL REFERENCES league,
    team_name VARCHAR ( 255 ) NOT NULL
);


-- The player table consists of every player in the NHL, pulled from the NHL API at certain points throughout the season
CREATE TABLE IF NOT EXISTS player (
    player_id serial PRIMARY KEY,
    player_name VARCHAR ( 255 ) NOT NULL,
    nhl_api_id int NOT NULL
);

-- The chosen player table contains the players that have actually been picked by a team
CREATE TABLE IF NOT EXISTS chosen_player (
    chosen_player_id serial PRIMARY KEY,
    player_id int NOT NULL REFERENCES player,
    goals int DEFAULT 0,
    shots int DEFAULT 0,
    expected_goals numeric DEFAULT 0
);

-- The chosen player team table shows which team has picked the chosen player
CREATE TABLE IF NOT EXISTS chosen_player_team (
    chosen_player_id int NOT NULL REFERENCES chosen_player,
    team_id int NOT NULL REFERENCES team
);