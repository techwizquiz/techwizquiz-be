import pool from '../utils/pool.js';

export default class Comment {
  commentId;
  questionId;
  userId;
  name;
  comment;

  constructor(row) {
    this.commentId = row.comment_id;
    this.questionId = row.question_id;
    this.userId = row.user_id;
    this.name = row.name;
    this.comment = row.comment;
  }

  static async insert({ userId, questionId, name, comment }) {
    const { rows } = await pool.query('INSERT INTO comments (user_id, question_id, name, comment) VALUES ($1, $2, $3, $4) RETURNING *', [userId, questionId, name, comment]);
    return new Comment(rows[0]);
  }
}
