import pool from '../utils.pool.js';

export default class User {
  id;
  username;
  passwordHash;
  correct;
  incorrect;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.passwordHash = row.password_hash;
    this.correct = row.correct;
    this.incorrect = row.incorrect;
  }
}
