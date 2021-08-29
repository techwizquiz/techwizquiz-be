import pool from '../utils/pool.js';
import Question from './Question.js';

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

  static async findAllCorrectResponsesByUserId(id) {
    const { rows } = await pool.query(
      'SELECT * FROM responses WHERE user_id = $1 AND is_correct = TRUE', [id]
    );
    return rows.map(row => new Response(row));
  }

  static async findAllIncorrectResponsesByUserId(id) {
    const { rows } = await pool.query(
      'SELECT * FROM responses WHERE user_id = $1 AND is_correct = FALSE', [id]
    );
    return rows.map(row => new Response(row));
  }

  static async DidUserAnswerCorrectly(userId, questionId) {
    const { rows } = await pool.query(
      'SELECT is_correct FROM responses WHERE user_id = $1 AND question_id = $2', [userId, questionId]
    );
    return is_correct;
  }
}
