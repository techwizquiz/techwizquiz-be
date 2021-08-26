import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
// import Question from '../lib/models/Question.js';

const peachesQ = {
  level: 2,
  question: 'Does Peaches have a dog\'s name?',
  answer: 'a',
  a: 'yes',
  b: 'no',
  c: 'maybe',
  d: 'actually a cat',
  language: 'JavaScript'
};

const perlQ = {
  level: 1,
  question: 'Does Perl have a cat\'s name?',
  answer: 'b',
  a: 'no',
  b: 'yes',
  c: 'maybe',
  d: 'actually a dog',
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
    console.log('res.body', res.body);
    expect(res.body).toEqual({
      questionId: '1',
      ...peachesQ
    });
  });
});


