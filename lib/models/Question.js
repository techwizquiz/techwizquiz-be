import pool from '../utils/pool.js';

export default class Question {
  questionId;
  question;
  answer;
  a;
  b;
  c;
  d;
  language;

  constructor(row) {
    this.questionId = row.question_id;
    this.question = row.question;
    this.answer = row.answer;
    this.a = row.a;
    this.b = row.b;
    this.c = row.c;
    this.d = row.d;
    this.language = row.language;
  }
}
