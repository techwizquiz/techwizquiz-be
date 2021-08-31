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
    return new Stat(rows[0]);
  }

  static async findScoreByUserId(id) {
    const { rows } = await pool.query(
      'SELECT * FROM stats WHERE user_id = $1', [id]
    );
    return new Stat(rows[0]);
  }

  static async updateScore(newScore, userId) {
    const { rows } = await pool.query(
      'UPDATE stats SET score = $1 WHERE user_id = $2 RETURNING *', [newScore, userId]
    );
    console.log({ rows });
    return new Stat(rows[0]);
  }
}