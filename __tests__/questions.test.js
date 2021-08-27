import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
// import Question from '../lib/models/Question.js';

const peachesQ = {
  level: 2,
  questionTitle: 'Answer',
  questionText: 'Does Peaches have a dog\'s name?',
  answer: 'a',
  a: 'yes',
  b: 'no',
  c: 'maybe',
  d: 'actually a cat',
  explanation: 'it is obvious',
  language: 'JavaScript'
};

const perlQ = {
  level: 1,
  questionTitle: 'Answer',
  questionText: 'Does Perl have a cat\'s name?',
  answer: 'b',
  a: 'no',
  b: 'yes',
  c: 'maybe',
  d: 'actually a dog',
  explanation: 'it is known',
  language: 'Perl'
};

describe('questions routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a question via POST', async () => {
    const res = await request(app)
      .post('/api/v1/questions')
      .send(peachesQ);
    expect(res.body).toEqual({
      questionId: '1',
      ...peachesQ
    });
  });
});


