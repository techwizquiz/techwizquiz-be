import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import UserService from '../lib/services/UserService.js';
import Question from '../lib/models/Question.js';
import User from '../lib/models/User.js';

const agent = request.agent(app);

const response1 = {
  userId: '1',
  questionId: '1',
  isCorrect: true
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

  beforeEach(async() => {
    await setup(pool);
  });

  it('creates a response via POST', async () => {

    await UserService.create({
      email: 'peaches@peaches.com',
      password: 'peaches'
    });

    const authorized = await UserService.authorize({
      email: 'peaches@peaches.com',
      password: 'peaches'
    });

    await Question.insert(peachesQ);

    console.log(authorized);

    const res = await agent
      .post('/api/v1/responses')
      .send(response1)
      .set('Cookie', process.env.TEST_JWT);
    expect(res.body).toEqual({
      responseId: '1',
      ...response1
    });
  });

  // for scoring purposes: find correct responses by user id
  // it('finds correct responses by user id', async () => {
    
  // });

  // for scoring purposes: find incorrect responses by user id

  // patch isCorrect column to update question from incorrect to correct 

});

