import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import UserService from '../lib/services/UserService.js';
import Question from '../lib/models/Question.js';

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

const response3 = {
  userId: '1',
  questionId: '3',
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

const mamaQ = {
  level: 1,
  questionTitle: 'Answer',
  questionText: 'Does Mama have a dog\'s name?',
  answer: 'b',
  a: 'no',
  b: 'yes',
  c: 'maybe',
  d: 'actually a cat',
  explanation: 'it is known',
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
    await Question.insert(mamaQ);

    await agent
      .post('/api/v1/responses')
      .send(response1)
      .set('Cookie', process.env.TEST_JWT);

    await agent
      .post('/api/v1/responses')
      .send(response2)
      .set('Cookie', process.env.TEST_JWT);

    await agent
      .post('/api/v1/responses')
      .send(response3)
      .set('Cookie', process.env.TEST_JWT);

    const res = await agent
      .get(`/api/v1/responses/${user.id}/correct`);
    expect(res.body).toEqual([
      {
        responseId: '1',
        ...response1
      }
    ]);
  });

  // for scoring purposes: find all incorrect responses by user id
  it('finds incorrect responses by user id', async () => {
    const user = await UserService.create({
      email: 'peaches@peaches.com',
      password: 'peaches'
    });

    await Question.insert(peachesQ);
    await Question.insert(perlQ);
    await Question.insert(mamaQ);

    await agent
      .post('/api/v1/responses')
      .send(response1)
      .set('Cookie', process.env.TEST_JWT);

    await agent
      .post('/api/v1/responses')
      .send(response2)
      .set('Cookie', process.env.TEST_JWT);

    await agent
      .post('/api/v1/responses')
      .send(response3)
      .set('Cookie', process.env.TEST_JWT);

    const res = await agent
      .get(`/api/v1/responses/${user.id}/incorrect`);
    expect(res.body).toEqual([
      {
        responseId: '2',
        ...response2
      },
      {
        responseId: '3',
        ...response3
      }
    ]);
  });

  // for display purposes: find whether user answered question correctly or incorrectly 
  it('for given question, finds whether user answered it correctly or incorrectly', async () => {
    const user = await UserService.create({
      email: 'peaches@peaches.com',
      password: 'peaches'
    });

    const peachesQuestion = await Question.insert(peachesQ);

    await agent
      .post('/api/v1/responses')
      .send(response1)
      .set('Cookie', process.env.TEST_JWT);

    const res = await agent
      .get(`/api/v1/responses/${user.id}/${peachesQuestion.questionId}/status`);
    expect(res.body).toEqual(true);
    console.log(res.body);
  });

  // patch isCorrect column to update question from incorrect to correct 
  it('patches is_correct from false to true', async () => {
    const user = await UserService.create({
      email: 'peaches@peaches.com',
      password: 'peaches'
    });

    const perlQuestion = await Question.insert(perlQ);

    await agent
      .post('/api/v1/responses')
      .send({
        userId: '1',
        questionId: '1',
        isCorrect: false
      })
      .set('Cookie', process.env.TEST_JWT);

    const res = await agent
      .patch(`/api/v1/responses/${user.id}/${perlQuestion.questionId}`);

    expect(res.body).toEqual({
      responseId: '1',
      userId: '1',
      questionId: '1',
      isCorrect: true
    });
  });
});

