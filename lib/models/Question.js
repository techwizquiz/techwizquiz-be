import pool from '../utils/pool.js';

export default class Question {
  questionId;
  level;
  question;
  answer;
  a;
  b;
  c;
  d;
  language;

  constructor(row) {
    this.questionId = row.question_id;
    this.level = row.level;
    this.question = row.question;
    this.answer = row.answer;
    this.a = row.a;
    this.b = row.b;
    this.c = row.c;
    this.d = row.d;
    this.language = row.language;
  }

  static async insert({ level, question, answer, a, b, c, d, language }) {
    const { rows } = await pool.query('INSERT INTO questions (level, question, answer, a, b, c, d, language) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [level, question, answer, a, b, c, d, language]);
    return new Question(rows[0]);
  }

  // get all questions
  static async findAllQuestions() {
    const { rows } = await pool.query('SELECT * FROM questions')
    return rows.map(row => new Question(row));
  }
    
  // get question by id
}
