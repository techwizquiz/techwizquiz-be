import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import UserService from '../lib/services/UserService.js';
import Question from '../lib/models/Question.js';

const response1 = {
  userId: '1',
  questionId: '1',
  isCorrect: true
};

const user = {
  email: 'peachy@peachy.com',
  password: 'peachesthedog'
};

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

describe('responses routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a response via POST', async () => {
    await UserService.create(user);
    await Question.insert(peachesQ);

    const res = await request(app)
      .post('/api/v1/responses')
      .send(response1);
    expect(res.body).toEqual({
      responseId: '1',
      ...response1
    });
  });

  it('filters responses by user id', async () => {
    
  });

});

