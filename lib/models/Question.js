import pool from '../utils/pool.js';

export default class Question {
  questionId;
  level;
  questionTitle;
  questionText;
  answer;
  a;
  b;
  c;
  d;
  explanation;
  language;

  constructor(row) {
    this.questionId = row.question_id;
    this.level = row.level;
    this.questionTitle = row.question_title;
    this.questionText = row.question_text;
    this.answer = row.answer;
    this.a = row.a;
    this.b = row.b;
    this.c = row.c;
    this.d = row.d;
    this.explanation = row.explanation;
    this.language = row.language;
  }

  static async insert({ level, questionTitle, questionText, answer, a, b, c, d, explanation, language }) {
    const { rows } = await pool.query('INSERT INTO questions (level, question_title, question_text, answer, a, b, c, d, explanation, language) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', [level, questionTitle, questionText, answer, a, b, c, d, explanation, language]);
    return new Question(rows[0]);
  }

  // get all questions
  static async findAllQuestions() {
    const { rows } = await pool.query('SELECT * FROM questions')
    return rows.map(row => new Question(row));
  }
    
  // get question by id
  static async findQuestionById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM questions WHERE question_id = $1', [id]
    );
    return new Question(rows[0]);
  }
}
