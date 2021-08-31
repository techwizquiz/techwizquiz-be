import pool from '../utils/pool.js';

export default class Stat {
  statId;
  userId;
  score;

  constructor(row) {
    this.statId = row.stat_id;
    this.userId = row.user_id;
    this.score = row.score;
  }

  static async insert({ userId, score }) {
    const { rows } = await pool.query('INSERT INTO stats (user_id, score) VALUES ($1, $2) RETURNING *', [userId, score]);
    console.log(rows[0]);
    console.log('new stat', new Stat(rows[0]));
    return new Stat(rows[0]);
  }
}