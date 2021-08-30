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
}