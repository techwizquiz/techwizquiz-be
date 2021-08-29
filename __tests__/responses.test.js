import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import UserService from '../lib/services/UserService.js';
import Question from '../lib/models/Question.js';
import Response from '../lib/models/Response.js';

const agent = request.agent(app);

const response1 = {
  userId: '1',
  questionId: '1',
  isCorrect: true
};

const response2 = {
  userId: '1',
  questionId: '2',
  isCorrect: false
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

describe('responses routes', () => {

  beforeEach(async() => {
    await setup(pool);
  });

  it('creates a response via POST', async () => {
    await UserService.create({
      email: 'peaches@peaches.com',
      password: 'peaches'
    });

    await Question.insert(peachesQ);

    const res = await agent
      .post('/api/v1/responses')
      .send(response1)
      .set('Cookie', process.env.TEST_JWT);
    expect(res.body).toEqual({
      responseId: '1',
      ...response1
    });
  });

  // for scoring purposes: find all correct responses by user id
  it('finds correct responses by user id', async () => {
    const user = await UserService.create({
      email: 'peaches@peaches.com',
      password: 'peaches'
    });

    await Question.insert(peachesQ);
    await Question.insert(perlQ);

    await agent
      .post('/api/v1/responses')
      .send(response1)
      .set('Cookie', process.env.TEST_JWT);

    await agent
      .post('/api/v1/responses')
      .send(response2)
      .set('Cookie', process.env.TEST_JWT);

    const res = await agent
      .get(`/api/v1/responses/${user.id}/correct`);
    expect(res.body).toEqual({
      responseId: '1',
      ...response1
    });
  });

  // for scoring purposes: find all incorrect responses by user id

  // for display purposes: find whether user answered question correctly or incorrectly 

  // patch isCorrect column to update question from incorrect to correct 

});

