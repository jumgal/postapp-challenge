CREATE DATABASE postapp;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64),
  email VARCHAR(64) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE posts(
 post_id SERIAL PRIMARY KEY,
 title VARCHAR(255),
 user_id INTEGER REFERENCES users(id)
);
