import pool from '../utils/pool.js';

export default class Response {
  responseId;
  userId;
  questionId;
  isCorrect;

  constructor(row) {
    this.responseId = row.response_id;
    this.userId = row.user_id;
    this.questionId = row.question_id;
    this.isCorrect = row.is_correct;
  }

  static async insert({ userId, questionId, isCorrect }) {
    const { rows } = await pool.query('INSERT INTO responses (user_id, question_id, is_correct) VALUES ($1, $2, $3) RETURNING *', [userId, questionId, isCorrect]);
    return new Response(rows[0]);
  }
}