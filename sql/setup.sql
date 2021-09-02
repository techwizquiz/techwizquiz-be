DROP TABLE IF EXISTS users,
questions,
responses,
stats,
comments 
CASCADE;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  avatar TEXT,
  password_hash TEXT NOT NULL
);

CREATE TABLE questions (
  question_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  level INT NOT NULL,
  question_title TEXT NOT NULL,
  question_text TEXT NOT NULL,
  answer TEXT NOT NULL,
  a TEXT NOT NULL,
  b TEXT NOT NULL,
  c TEXT NOT NULL,
  d TEXT NOT NULL,
  explanation TEXT,
  language TEXT NOT NULL
);

CREATE TABLE responses (
  response_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id),
  question_id BIGINT NOT NULL REFERENCES questions(question_id),
  is_correct BOOLEAN NOT NULL
);

CREATE TABLE stats (
  stat_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id),
  score INT NOT NULL
);

CREATE TABLE comments (
  comment_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  question_id BIGINT NOT NULL REFERENCES questions(question_id),
  user_id BIGINT NOT NULL REFERENCES users(id),
  name TEXT,
  comment TEXT NOT NULL
)
